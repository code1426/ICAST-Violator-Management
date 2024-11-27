import { useState } from "react";
import supabase from "../utils/supabase";
import { AuthDetailsType } from "../types/auth.types";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitLogin = async ({ email, password }: AuthDetailsType): Promise<boolean> => {
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return false;
      }

      return true;
    } catch (err: unknown) {
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred. Please try again later.");
      return false
    } finally {
      setLoading(false);
    }
  };

  return { submitLogin, loading, error, setError };
};

export default useLogin;
