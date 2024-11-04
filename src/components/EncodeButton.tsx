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
      className="bg-color1 text-white py-2 px-4 rounded lg:text-base md:text-sm text-xs border-color1 border-2 shadow-md shadow-color1 hover:bg-color2 hover:border-color2 hover:shadow-color2"
    >
      Encode
    </button>
  );
};

export default EncodeButton;
