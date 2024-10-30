import { useNavigate } from "react-router-dom";

interface ViolatorProps {
  id: string;
  name: string;
  address: string;
  date: string;
}

const ViolatorCard = ({ id, name, address, date }: ViolatorProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer mb-2 m-4 w-5/6"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="flex-1 text-left">
        <span className="text-lg font-medium">{name}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="text-lg font-medium">{address}</span>
      </div>
      <div className="flex-1 text-right">
        <span className="text-lg font-medium">{date}</span>
      </div>
    </div>
  );
};

export default ViolatorCard;
