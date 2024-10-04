import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out successful", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log("TOAST ERROR");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="flex items-center text-blue-500 px-3 font-bold hover:cursor-pointer 
      bg-white hover:bg-blue-300 "
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
