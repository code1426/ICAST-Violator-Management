import React from 'react';
import { useNavigate } from 'react-router-dom';

const EncodeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleEncode = () => {
    navigate('/encode-data');
  };

  return (
    <button
      onClick={handleEncode}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Encode
    </button>
  );
};

export default EncodeButton;