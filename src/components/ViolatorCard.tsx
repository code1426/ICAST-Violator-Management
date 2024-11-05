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
  onDelete,
  onEdit,
}: ViolatorProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="flex justify-between items-center active:bg-[#a7a09b] bg-color5 border transition-all hover:bg-[#c2bbb5] border-black p-4 rounded-lg shadow-md cursor-pointer my-1 w-5/6 lg:text-base md:text-sm sm:text-xs text-xxs relative"
      onClick={handleCardClick}>
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
        className="absolute p-2 lg:right-4 right-[1px] lg:scale-100 scale-50"
        onClick={(e) => {
          e.stopPropagation();
          onOptionsClick();
        }}>
        <img
          src="../assets/option.png"
          alt="Options"
          className="w-6 h-4"
        />
      </button>
      {isOptionsVisible && (
        <div className="absolute top-[-40px] md:top-[-35px] lg:top-[-30px] right-0 transform translate-x-full ml-2 z-10">
          <OptionsButton
            onDeleteButtonCLick={onDelete}
            onEditButtonClick={onEdit}
          />
        </div>
      )}
    </div>
  );
};

export default ViolatorCard;
