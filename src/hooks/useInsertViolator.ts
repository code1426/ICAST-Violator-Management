import { useState } from "react";
import { Violation, Violator } from "../types/violator.types";
import db from "../utils/localDB";
import pushToSupabase from "../utils/PushToSupabase";

const useInsertViolator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const insertData = async (
    violatorData: Violator,
    violationData: Omit<Violation, "violator_id">
  ) => {
    setLoading(true);
    let violatorId = violatorData.id;

    try {
      // check if the violator is already existing
      const existingViolator = await db.CaughtViolators.where({
        first_name: violatorData.first_name,
        last_name: violatorData.last_name,
        date_of_birth: violatorData.date_of_birth,
      }).first();

      if (existingViolator) {
        violatorId = existingViolator.id;
      } else {
        await db.CaughtViolators.add({ ...violatorData, Violations: [] });
        await db.SyncQueue.add({
          table_name: "CaughtViolators",
          action: "add",
          payload: violatorData,
        }).then(() => {
          console.log("added violator into syncQueue");
        });
      }
      await db.Violations.add({ ...violationData, violator_id: violatorId });
      await db.SyncQueue.add({
        table_name: "Violations",
        action: "add",
        payload: { ...violationData, violator_id: violatorId },
      }).then(() => {
        console.log("added violation into syncQueue");
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      pushToSupabase()
        .then(() => console.log("Data synced with Supabase"))
        .catch((error) => {
          console.error("pushError: ", error);
        });
    }
  };

  return { insertData, loading, setLoading, error };
};

export default useInsertViolator;
