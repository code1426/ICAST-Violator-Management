import ViolatorCard from "../components/ViolatorCard";
import Loading from "../components/Loading";
import { useEffect, useState, useRef, useContext } from "react";
import HomeSubHeader from "../components/HomeSubHeader";

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

  console.log(role);

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
    <>
      <div className=" bg-color6 h-[90vh] mt-20 overflow-y-auto overflow-x-hidden">
        <HomeSubHeader
          caughtViolators={caughtViolators}
          role={role}
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
        />

        <div className="card-container flex flex-col items-center justify-center">
          {filteredUsers?.map((caughtViolator) => (
            <ViolatorCard
              id={caughtViolator.id}
              key={caughtViolator.id}
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
          ))}
          {loading && <Loading message="" />}
        </div>
      </div>
    </>
  );
};

export default HomePage;
