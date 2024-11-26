import { useEffect, useState, useContext } from "react";
import { CaughtViolator } from "../types/violator.types";
import db from "../utils/localDB";

import RoleContext from "../context/RoleProvider";
import type { RoleContextType } from "../types/auth.types";

const useCaughtViolators = () => {
  const [caughtViolators, setCaughtViolators] = useState<
    CaughtViolator[] | undefined
  >([]);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  const { role }: RoleContextType = useContext(RoleContext);

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

        if (role === "Police") {
          const policeViolators = violatorsWithViolations
            .map((violator) => ({
              ...violator,
              Violations: violator.Violations.filter(
                (violation) => violation.apprehender_type === "Officer"
              ),
            }))
            .filter((violator) => violator.Violations.length > 0);

          setCaughtViolators(policeViolators);
        } else {
          setCaughtViolators(violatorsWithViolations.reverse());
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolators();
  }, [role]);

  return { caughtViolators, setCaughtViolators, loading, error };
};

export default useCaughtViolators;
