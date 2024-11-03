import React from "react";
import { useNavigate } from "react-router-dom";

const EncodeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleEncode = () => {
    navigate("/formInput");
  };

  return (
    <button
      onClick={handleEncode}
      className="bg-color1 text-white transition-all py-2 px-4 rounded-md lg:text-base md:text-sm text-xs shadow-md shadow-gray-500 hover:bg-color2 w-22 h-11"
    >
      Encode
    </button>
  );
};

export default EncodeButton;
