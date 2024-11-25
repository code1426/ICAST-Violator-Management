import React, { useContext, useState } from "react";
import supabase from "../utils/supabase";
import { AuthDetailsType, RoleContextType } from "../types/auth.types";
import RoleContext from "../context/RoleProvider";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { setRole }: RoleContextType = useContext(RoleContext);
  const navigate = useNavigate();

  const submitLogin = async ({ email, password }: AuthDetailsType) => {
    setLoading(true);
    const { data: authDetails, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    console.log(authDetails);

    const { data: roles, error: roleFetchingError } = await supabase
      .from("Roles")
      .select("role_name")
      .eq("user_id", authDetails.user?.id!);

    if (roleFetchingError) {
      setError(roleFetchingError.message);
      setLoading(false);
      return;
    }

    console.log(roles);
    const userRole = roles[0].role_name;
    setRole!(userRole);
    setLoading(false);

    navigate(`/home`);
  };

  return { submitLogin, loading, error };
};

export default useLogin;
