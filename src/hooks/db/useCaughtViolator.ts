import { useEffect, useState } from "react";
import { Violation, Violator } from "../../types/localDB.types";
import db from "../../utils/localDB";

const useCaughtViolator = (violatorId: string) => {
  const [caughtViolator, setCaughtViolator] = useState<Violator>();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViolator = async () => {
      try {
        const violator = await db.CaughtViolators.where("id")
          .equals(violatorId)
          .first();
        const violations = await db.Violations.where("violator_id")
          .equals(violatorId)
          .toArray();
        setCaughtViolator(violator);
        setViolations(violations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolator();
  }, [violatorId]);

  return { caughtViolator, violations, loading, error };
};

export default useCaughtViolator;
