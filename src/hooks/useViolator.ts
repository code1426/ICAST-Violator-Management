import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import type { Violator } from "../types/violator";

import supabase from "../utils/supabase";

export const useViolator = (violatorId: string) => {
  const [ violator, setViolator ] = useState<Violator>();
  const [ error, setError ] = useState<PostgrestError | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchViolations = async () => {
        const { data, error } = await supabase.from("Violators")
        .select(`*, Violations(*)`)
        .eq("violator_id", violatorId)
        setLoading(false)
        if (error) {
          setError(error);
        } else if (data) {
          setViolator(data[0]);
      }
    };

    fetchViolations();
  }, []);

  return { violator, loading, error };
};
