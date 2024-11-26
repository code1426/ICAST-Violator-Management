import { useState } from "react";
import { Violation, Violator } from "../types/violator.types";
import db from "../utils/localDB";
import pushToSupabase from "../utils/PushToSupabase";
import { FormData } from "../types/formData.type";

const useInsertViolator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [existingViolator, setExistingViolator] = useState<Violator | null>(
    null
  );

  const checkViolatorExists = async (
    InitialViolatorData: Partial<FormData>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const existingViolator = await db.CaughtViolators.where({
        first_name: InitialViolatorData.FirstName,
        last_name: InitialViolatorData.LastName,
        middle_name: InitialViolatorData.MiddleName,
        date_of_birth: InitialViolatorData.DateOfBirth,
      }).first();

      if (existingViolator) {
        setExistingViolator(existingViolator);
        return true;
      }
      return false;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertData = async (
    violatorData: Violator,
    violationData: Omit<Violation, "violator_id">
  ) => {
    setLoading(true);
    let violatorId = violatorData.id;

    try {
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

  return {
    insertData,
    loading,
    setLoading,
    error,
    existingViolator,
    checkViolatorExists,
  };
};

export default useInsertViolator;
