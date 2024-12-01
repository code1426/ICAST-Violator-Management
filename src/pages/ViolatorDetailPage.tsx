import { useParams } from "react-router-dom";
import ViolationsCard from "../components/ViolationsCard";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "react-activity/dist/Spinner.css";
import { useEffect, useState, useRef } from "react";
import FilterButton from "../components/FilterButton";

import useCaughtViolator from "../hooks/useCaughtViolator";

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    caughtViolator,
    violations: ViolationsList,
    loading,
  } = useCaughtViolator(id!);
  const [filteredViolations, setFilteredViolations] = useState(ViolationsList);
  const [selectedViolatorId, setSelectedViolatorId] = useState<string | null>(
    null
  );
  const violatorRefs = useRef(new Map<string, HTMLDivElement | null>());

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

  useEffect(() => {
    setFilteredViolations(ViolationsList);
  }, [ViolationsList]);

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

  if (loading) {
    return (
      <>
        <Header />
        <Loading message="" />
      </>
    );
  }

  return (
    <div className="bg-color6 h-[90vh] mt-20 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col p-4">
        <div className="my-5 bg-color3 p-10 space-y-3 rounded-3xl border-2 border-color1">
          <p className="lg:text-2xl md:text-xl text-lg font-bold">
            Name :{" "}
            {caughtViolator!.first_name + " " + caughtViolator!.last_name}
          </p>
          <p className="lg:text-lg md:text-base text-sm">
            Address : {caughtViolator!.address}
          </p>
          <p className="lg:text-lg md:text-base text-sm">
            Age : {getAge(caughtViolator!.date_of_birth)}
          </p>
          <p className="lg:text-lg md:text-base text-sm">
            Sex : {caughtViolator!.sex}
          </p>
          <p className="lg:text-lg md:text-base text-sm">
            Civil Status : {caughtViolator!.civil_status}
          </p>
          <p className="lg:text-lg md:text-base text-sm">
            Institution : {caughtViolator!.institution}
          </p>
        </div>
        <div className="flex flex-row-reverse mb-2">
          <FilterButton
            entries={ViolationsList}
            setEntries={setFilteredViolations}
          />
        </div>
        <div className="flex flex-col items-center sticky top-4 right-0 left-0">
          <div className="flex justify-between items-center border-2 mb-3 border-black bg-color3 p-3 rounded-t-lg shadow-md w-full lg:text-base md:text-sm sm:text-xs text-xxs space-x-2">
            <div className="flex-1 text-center">
              <span className="font-bold">Violation Date</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">Place of Violation</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">Violator Type</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">Apprehender Name </span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">Apprehender Type</span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">OR No. </span>
            </div>
            <div className="flex-1 text-center">
              <span className="font-bold">Status</span>
            </div>
          </div>
          {filteredViolations?.map((violation) => (
            <div
              key={violation.id}
              className="relative w-full flex justify-center"
            >
              <ViolationsCard
                key={violation.id}
                id={violation.id}
                violation_date={violation.violation_date}
                violation_place={violation.violation_place}
                violator_type={violation.violator_type}
                apprehender_name={violation.apprehender_name}
                apprehender_type={violation.apprehender_type}
                OR_number={violation.OR_number}
                paid={violation.paid}
                isOptionsVisible={selectedViolatorId === violation.id}
                onOptionsClick={() => handleOpenOptions(violation.id)}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
        <div className="mb-16"></div>
      </div>
    </div>
  );
};

export default ViolatorDetailPage;
