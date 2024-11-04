import { useNavigate } from "react-router-dom";

interface ViolatorProps {
  id: string;
  name: string;
  age: number;
  sex: string;
  latestViolationDate: string;
  violationCount: number;
}

const ViolatorCard = ({
  id,
  name,
  age,
  sex,
  latestViolationDate,
  violationCount
}: ViolatorProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center bg-color5 border border-black p-4 rounded-lg shadow-md cursor-pointer my-1 w-5/6 lg:text-base md:text-sm text-xs"
      onClick={() => navigate(`/detail/${id}`)}>
      <div className="flex-1 text-left">
        <span className=" font-medium">{name}</span>
      </div>
      <div className="flex-1 text-center">
        <span className=" font-medium">{age}</span>
      </div>
      <div className="flex-1 text-center">
        <span className=" font-medium">{sex}</span>
      </div>
      <div className="flex-1 text-center">
        <span className=" font-medium">{latestViolationDate}</span>
      </div>
      <div className="flex-1 text-center">
        <span className=" font-medium">{violationCount}</span>
      </div>
    </div>
  );
};

export default ViolatorCard;
