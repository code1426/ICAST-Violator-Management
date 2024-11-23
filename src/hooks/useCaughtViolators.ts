import { useEffect, useState } from "react";
import { CaughtViolator } from "../types/violator.types";
import db from "../utils/localDB";

const useCaughtViolators = () => {
  const [caughtViolators, setCaughtViolators] = useState<
    CaughtViolator[] | undefined
  >([]);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViolators = async () => {
      try {
        const violators = await db.CaughtViolators.orderBy(
          "created_at"
        ).toArray();

        const violatorsWithViolations = await Promise.all(
          violators.map(async (violator) => {
            const violations = await db.Violations.where("violator_id")
              .equals(violator.id)
              .toArray();
            violator.Violations = violations;
            return violator;
          })
        );
        setCaughtViolators(violatorsWithViolations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolators();
  }, []);

  return { caughtViolators, setCaughtViolators, loading, error };
};

export default useCaughtViolators;
