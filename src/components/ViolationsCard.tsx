// import { Violation } from "../types/violator";
import { Violation } from "../types/violator.types";
import OptionsButton from "./OptionsButton";

import option from "@/assets/option.png"

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
    <div className="flex justify-between items-center w-full bg-color5 border border-black px-3 py-4 rounded-lg shadow-md cursor-pointer my-1 lg:text-base md:text-sm sm:text-xs text-xxs relative">
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
        className="absolute lg:right-4 right-0.5 lg:scale-100 scale-50"
        onClick={(e) => {
          e.stopPropagation();
          onOptionsClick();
        }}
      >
        <img src={option} alt="Options" className="w-6 h-4" />
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

export default ViolationsCard;
