import { useState } from "react";
import { Violator, Violation } from "../types/violator.types";
import db from "../utils/localDB";
import pushToSupabase from "../utils/PushToSupabase";

const useDeleteViolator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (violator_id: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the violator
      const violator = await db.CaughtViolators.get(violator_id.toString());
      if (!violator) {
        throw new Error("Violator not found");
      }

      // Fetch associated violations
      const violations = await db.Violations.where({ violator_id }).toArray();
      const violationIds = violations;

      // Start transactional deletion
      await Promise.all([
        // Delete violations
        db.Violations.where({ violator_id }).delete(),
        db.SyncQueue.add({
          table_name: "Violations",
          action: "delete",
          payload: violationIds,
        }),
      ]);

      // Delete the violator
      await Promise.all([
        db.CaughtViolators.delete(violator_id.toString()),
        db.SyncQueue.add({
          table_name: "CaughtViolators",
          action: "delete",
          payload: violator,
        }),
      ]);

      console.log("Violator and related violations deleted successfully.");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err : new Error("Unknown error occurred.");
      setError(errorMessage);
      console.error("Error during deletion:", errorMessage);
    } finally {
      setLoading(false);

      // Sync changes with Supabase
      try {
        await pushToSupabase();
        console.log("Changes synced successfully with Supabase.");
      } catch (syncError) {
        console.error("Error syncing with Supabase:", syncError);
      }
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteViolator;
