import { useState } from "react";
import { Violation, Violator } from "../types/violator.types";
import { FormData } from "../types/formData.type";
import db from "../utils/localDB";
import pushToSupabase from "../utils/PushToSupabase";
import insertUnsyncedTable from "../utils/insertUnsyncedTable";

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
        await insertUnsyncedTable("CaughtViolators", "add", violatorData);
      }
      await db.Violations.add({ ...violationData, violator_id: violatorId });
      await insertUnsyncedTable("Violations", "add", {
        ...violationData,
        violator_id: violatorId,
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
