import EncodeButton from "../components/EncodeButton";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";

import { CaughtViolator } from "../types/violator.types";

interface Props {
  role: string | undefined;
  caughtViolators: CaughtViolator[] | undefined;
  setFilteredUsers: React.Dispatch<
    React.SetStateAction<CaughtViolator[] | undefined>
  >;
  filteredUsers: CaughtViolator[] | undefined;
}

const HomeSubHeader = ({
  role,
  caughtViolators,
  setFilteredUsers,
  filteredUsers,
}: Props) => {
  return (
    <div className="sticky top-0 left-0 right-0 z-20 mb-3 pt-2 bg-color6">
      <div className="flex flex-row w-5/6 items-center justify-between justify-self-center my-5 space-x-2 ">
        <EncodeButton role={role} />
        <SearchBar
          entries={caughtViolators}
          setFilteredEntries={setFilteredUsers}
        />
        <SortButton entries={filteredUsers!} setEntries={setFilteredUsers} />
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center border-2 border-black bg-color3 p-3 rounded-t-lg shadow-md w-5/6 lg:text-base md:text-sm sm:text-xs text-xxs">
          <div className="flex-1 text-center">
            <span className="font-bold">Name</span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold">Age</span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold">Sex</span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold">Latest Violation Date</span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold">Violation Count</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSubHeader;
