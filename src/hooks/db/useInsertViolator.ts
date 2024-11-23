import { useState } from "react";
import { Violator, Violation } from "../../types/localDB.types";
import db from "../../utils/localDB";

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
        await db.CaughtViolators.add(violatorData);
      }
      await db.Violations.add({ ...violationData, violator_id: violatorId });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { insertData, loading, setLoading, error };
};

export default useInsertViolator;
