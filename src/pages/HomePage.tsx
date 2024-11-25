import SortButton from "../components/SortButton";
import ViolatorCard from "../components/ViolatorCard";
import EncodeButton from "../components/EncodeButton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";

import useCaughtViolators from "../hooks/useCaughtViolators";
import { CaughtViolator } from "../types/violator.types";
import RoleContext from "../context/RoleProvider";
import { RoleContextType } from "../types/auth.types";

const HomePage = () => {
  const { role }: RoleContextType = useContext(RoleContext);
  const { caughtViolators, loading } = useCaughtViolators();
  const [filteredUsers, setFilteredUsers] = useState(caughtViolators);
  const [selectedViolatorId, setSelectedViolatorId] = useState<string | null>(
    null
  );
  const violatorRefs = useRef(new Map<string, HTMLDivElement | null>());

  useEffect(() => {
    setFilteredUsers(caughtViolators);
  }, [caughtViolators]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutside = !Array.from(violatorRefs.current.values()).some(
        (ref) => ref?.contains(event.target as Node)
      );
      if (isClickedOutside) {
        handleCloseOptions();
      }
    };

    if (selectedViolatorId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedViolatorId]);

  const getAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleOpenOptions = (id: string) => {
    setSelectedViolatorId(selectedViolatorId === id ? null : id);
  };

  const handleCloseOptions = () => {
    setSelectedViolatorId(null);
  };

  const handleDelete = () => {
    handleCloseOptions();
    // Delete logic here
  };

  const handleEdit = () => {
    handleCloseOptions();
    // Edit logic here
  };

  const getLatestViolationDate = (violator: CaughtViolator) => {
    return new Date(
      Math.max(
        ...violator.Violations.map((violation) =>
          new Date(violation.violation_date).getTime()
        )
      )
    )
      .toISOString()
      .split("T")[0];
  };

  return (
    <div className="min-h-screen bg-color6 p-0 pb-10">
      <Header />
      <div className="flex flex-row w-5/6 items-center justify-between justify-self-center my-5 space-x-2">
        <EncodeButton role={role} />
        <SearchBar
          entries={caughtViolators}
          setFilteredEntries={setFilteredUsers}
        />
        <SortButton
          entries={filteredUsers!}
          setEntries={setFilteredUsers}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center border-2 mb-3 border-black bg-color3 p-3 rounded-t-lg shadow-md w-5/6 lg:text-base md:text-sm sm:text-xs text-xxs">
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
          {/* <div className="flex-1 text-center"></div> */}
        </div>

        {filteredUsers?.map((caughtViolator) => (
          <div
            key={caughtViolator.id}
            className="relative w-full flex justify-center">
            <ViolatorCard
              id={caughtViolator.id}
              name={`${caughtViolator.first_name} ${caughtViolator.last_name}`}
              age={getAge(caughtViolator.date_of_birth)}
              sex={caughtViolator.sex}
              latestViolationDate={getLatestViolationDate(caughtViolator)}
              violationCount={caughtViolator.Violations.length}
              isOptionsVisible={selectedViolatorId === caughtViolator.id}
              onOptionsClick={() => handleOpenOptions(caughtViolator.id)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        ))}
        {loading && (
          <div className="flex text-lg justify-self-center self-center font-semibold p-16">
            <Spinner
              size={50}
              color="#3A2D28"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
