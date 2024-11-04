import { useNavigate } from "react-router-dom";
import OptionsButton from "./OptionsButton";

interface ViolatorProps {
  id: string;
  name: string;
  age: number;
  sex: string;
  latestViolationDate: string;
  violationCount: number;
  isOptionsVisible: boolean;
  onOptionsClick: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ViolatorCard = ({
  id,
  name,
  age,
  sex,
  latestViolationDate,
  violationCount,
  isOptionsVisible,
  onOptionsClick,
  onCancel,
  onDelete,
  onEdit,
}: ViolatorProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="flex justify-between items-center bg-color5 border transition-all hover:bg-[#c2bbb5] border-black p-4 rounded-lg shadow-md cursor-pointer my-1 w-5/6 lg:text-base md:text-sm text-xs relative"
      onClick={handleCardClick}
    >
      <div className="flex-1 text-center">
        <span className="font-medium">{name}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="font-medium">{age}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="font-medium">{sex}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="font-medium">{latestViolationDate}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="font-medium">{violationCount}</span>
      </div>
        <button
        className="absolute right-3 p-2"
          onClick={(e) => {
            e.stopPropagation();
            onOptionsClick();
          }}
        >
          <img
            src="../src/assets/option.png"
            alt="Options"
            className="w-6 h-4"
          />
        </button>
      {isOptionsVisible && (
        <div className="absolute top-[-60px] md:top-[-70px] lg:top-[-75px] right-0 transform translate-x-full ml-2 z-10">
          <OptionsButton
            onCancelButtonClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            onDeleteButtonCLick={onDelete}
            onEditButtonClick={onEdit}
          />
        </div>
      )}
    </div>
  );
};

export default ViolatorCard;
