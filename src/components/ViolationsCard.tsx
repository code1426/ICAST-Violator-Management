import { Violation } from "../types/violator";
import OptionsButton from "./OptionsButton";

const ViolationsCard = ({
  OR_number,
  apprehender_name,
  apprehender_type,
  paid,
  violation_date,
  violation_place,
  violator_type,
  isOptionsVisible,
  onOptionsClick,
  onDelete,
  onEdit,
}: Partial<Violation> & {
  isOptionsVisible: boolean;
  onOptionsClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  return (
    <div
      className="flex justify-between items-center w-full bg-color5 border border-black px-3 py-4 rounded-lg shadow-md cursor-pointer my-1 lg:text-base md:text-sm sm:text-xs text-xxs relative"
    >
      <div className="flex-1 text-center">
        <span className="font-normal">{violation_date}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="font-normal">{violation_place}</span>
      </div>
      <div className="flex-1 text-center ">
        <span className="font-normal">{violator_type}</span>
      </div>
      <div className="flex-1 text-center ">
        <span className="font-normal">{apprehender_name}</span>
      </div>
      <div className="flex-1 text-center ">
        <span className="font-normal">{apprehender_type}</span>
      </div>
      <div className="flex-1 text-center ">
        <span className="font-normal">{OR_number}</span>
      </div>
      <div className="flex-1 text-center ">
        <span className="font-normal">{paid ? "Paid" : "Unpaid"}</span>
      </div>
      <button
        className="absolute right-4"
        onClick={(e) => {
          e.stopPropagation();
          onOptionsClick();
        }}
      >
        <img src="../assets/option.png" alt="Options" className="w-6 h-4" />
      </button>
      {isOptionsVisible && (
        <div className="absolute top-[-60px] md:top-[-70px] lg:top-[-75px] right-0 transform translate-x-full ml-2 z-10">
          <OptionsButton
            onDeleteButtonCLick={onDelete}
            onEditButtonClick={onEdit}
          />
        </div>
      )}
    </div>
  );
};

export default ViolationsCard;
