import { useState } from "react";
import supabase from "../utils/supabase";
import type { Violator, Violation } from "../types/violator";
import { PostgrestError } from "@supabase/supabase-js";

const useInsertViolator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const insertData = async (
    violatorData: Violator,
    violationData: Omit<Violation, "violator_id">
  ) => {
    setLoading(true);

    try {
      // Check if the violator already exists
      const { data: existingViolator, error: findError } = await supabase
        .from("CaughtViolators")
        .select("id")
        .eq("first_name", violatorData.first_name)
        .eq("last_name", violatorData.last_name)
        .eq("date_of_birth", violatorData.date_of_birth)
        .single();

      let violatorId = violatorData.id;

      if (findError || !existingViolator) {
        // Insert a new violator
        const { error: insertError } = await supabase
          .from("CaughtViolators")
          .insert([violatorData])
          .single();

        if (insertError) {
          setLoading(false);
          setError(insertError);
        }
      } else {
        // Use existing violator ID
        violatorId = existingViolator.id;
      }

      // Insert the violation data
      const { error: violationError } = await supabase
        .from("Violations")
        .insert([{ ...violationData, violator_id: violatorId }]);

      if (violationError) {
        setError(violationError);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { insertData, loading, error };
};

export default useInsertViolator;
