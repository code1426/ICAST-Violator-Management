import { useEffect, useState, useContext } from "react";

import pushToSupabase from "../utils/PushToSupabase";
import pullFromSupabase from "../utils/pullFromSupabase";

import RoleContext from "../context/RoleProvider";
import type { RoleContextType } from "../types/auth.types";

const useInitializeDB = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setRole }: RoleContextType = useContext(RoleContext);

  useEffect(() => {
    const InitializeDB = async () => {
      setLoading(true);
      setRole!("Encoder");
      try {
        if (navigator.onLine) {
          await pullFromSupabase();
          await pushToSupabase();
        } else {
          setError(
            "Unable to Initialize the app. Check your internet connection."
          );
        }
      } catch (error) {
        console.error("Error initializing local database:", error);
        setError("Unable to initialize local database");
      } finally {
        setLoading(false);
      }
    };

    InitializeDB();
  }, []);

  return { loading, error };
};

export default useInitializeDB;
