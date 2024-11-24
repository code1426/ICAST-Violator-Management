import { useEffect, useState } from "react";

import pushToSupabase from "../utils/PushToSupabase";
import pullFromSupabase from "../utils/pullFromSupabase";

const useInitializeDB = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const InitializeDB = async () => {
      setLoading(true);
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
