import { useEffect, useState, useContext } from "react";
import { Violation, CaughtViolator } from "../types/violator.types";
import db from "../utils/localDB";

import RoleContext from "../context/RoleProvider";
import type { RoleContextType } from "../types/auth.types";

const useCaughtViolator = (violatorId: string) => {
  const [caughtViolator, setCaughtViolator] = useState<CaughtViolator>();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  const { role }: RoleContextType = useContext(RoleContext);

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

        if (role === "Police") {
          const policeViolations = violations.filter((violation) => {
            return violation.apprehender_type === "Officer";
          });
          setViolations(policeViolations);
        } else {
          setViolations(violations);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolator();
  }, [violatorId, role]);

  return { caughtViolator, violations, loading, error };
};

export default useCaughtViolator;
