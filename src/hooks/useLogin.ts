import React, { useContext, useState } from "react";
import supabase from "../utils/supabase";
import { AuthDetailsType, RoleContextType } from "../types/auth.types";
import RoleContext from "../context/RoleProvider";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { setRole }: RoleContextType = useContext(RoleContext);
  const navigate = useNavigate();

  const submitLogin = async ({ email, password }: AuthDetailsType) => {
    const { data: authDetails, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      alert(authError);
      return;
    }

    console.log(authDetails);

    const { data: roles, error: roleFetchingError } = await supabase
      .from("Roles")
      .select("role_name")
      .eq("user_id", authDetails.user?.id!);

    if (roleFetchingError) {
      alert(roleFetchingError);
      return;
    }

    console.log(roles);
    const userRole = roles[0].role_name;
    setRole!(userRole);

    navigate(`/home/${userRole}`);

    setLoading(false);
  };

  return { submitLogin, loading };
};

export default useLogin;
