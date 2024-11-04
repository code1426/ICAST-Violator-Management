interface OptionsButtonProps {
  onDeleteButtonCLick: () => void;

  onEditButtonClick: () => void;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({
  onDeleteButtonCLick,
  onEditButtonClick,
}) => {
  return (
    <div className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg mr-1">
      <ul className="flex flex-col">
        <li
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={onEditButtonClick}
        >
          Edit
        </li>
        <li
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={onDeleteButtonCLick}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};
export default OptionsButton;
