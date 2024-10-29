import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { Violator } from "../types/violator";

import supabase from "../utils/supabase";

export const useViolators = () => {
  const [ violators, setViolators ] = useState<Violator[] | undefined>([]);
  const [ error, setError ] = useState<PostgrestError | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchViolators = async () => {
        const { data, error } = await supabase.from("Violators")
          .select(`*, Violations (*)`);
        setLoading(false)

        if (error) {
          setError(error);
        } else if (data) {
          setViolators(data);
      }
    };

    fetchViolators();
  }, []);

  return { violators, setViolators, loading, error };
};
