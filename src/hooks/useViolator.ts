import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import type { CaughtViolator } from "../types/violator";

import supabase from "../utils/supabase";

export const useViolator = (violatorId: string) => {
  const [ caughtViolator, setViolator ] = useState<CaughtViolator>();
  const [ error, setError ] = useState<PostgrestError | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchViolator = async () => {
      const { data, error } = await supabase.from("CaughtViolators")
        .select(`*, Violations(*)`)
        .eq("id", violatorId)
      setLoading(false)

      if (error) {
        setError(error);
      } else if (data) {
        setViolator(data[0]);
      }
    };

    fetchViolator();
  }, []);

  return { caughtViolator, loading, error };
};
