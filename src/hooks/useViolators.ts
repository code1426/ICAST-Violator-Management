import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { CaughtViolator } from "../types/violator";

import supabase from "../utils/supabase";

export const useViolators = () => {
  const [ caughtViolatorList, setViolators ] = useState<CaughtViolator[] | undefined>([]);
  const [ error, setError ] = useState<PostgrestError | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchViolators = async () => {
      const { data, error } = await supabase.from("CaughtViolators")
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

  return { caughtViolatorList, setViolators, loading, error };
};
