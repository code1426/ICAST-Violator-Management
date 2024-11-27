import { useState, useEffect, useContext } from "react";
import supabase from "../utils/supabase";
import RoleContext from "../context/RoleProvider";

import type { RoleContextType } from "../types/auth.types";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { setRole }: RoleContextType = useContext(RoleContext);

  useEffect(() => {
    // Define the email-to-role mapping
    const emailRoleMap: Record<string, string> = {
      "encoder@gmail.com": "Encoder",
      "police@gmail.com": "Police",
      "agent@gmail.com": "Agent",
    };

    // Add the auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoading(true);

        if (session) {
          const role = emailRoleMap[session.user.email!] || null;
          if (role) {
            setIsAuthenticated(true);
            setRole!(role);
          } else {
            setError("Unauthorized user email");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }

        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setRole]);

  return { isAuthenticated, loading, error };
};

export default useAuth;
