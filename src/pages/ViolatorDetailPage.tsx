import { useParams } from "react-router-dom";
import { useViolator } from "../hooks/useViolator";
import ViolationsCard from "../components/ViolationsCard";
import Header from "../components/Header";

import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { useEffect, useState } from "react";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    caughtViolator,
    violations: ViolationsList,
    loading,
  } = useViolator(id!);
  const [filteredViolations, setFilteredViolations] = useState(ViolationsList);
  const [selectedViolatorId, setSelectedViolatorId] = useState<string | null>(
    null
  );

  const handleOpenOptions = (id: string) => {
    setSelectedViolatorId(selectedViolatorId === id ? null : id);
  };

  const handleCloseOptions = () => {
    setSelectedViolatorId(null);
  };
  const handleDelete = () => {
    // Implement delete logic here
    handleCloseOptions();
  };

  const handleEdit = () => {
    // Implement edit logic here
    handleCloseOptions();
  };

  useEffect(() => {
    setFilteredViolations(ViolationsList);
  }, [ViolationsList]);

  // const { violations: ViolationsList } = useViolator(id!); // no need to use the useViolator hook again, just get the violations in the first useViolator hook. and this just makes the fetching longer.

  const getAge = (dateString: string) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex text-lg h-screen w-screen items-center justify-center font-semibold p-12">
          <Spinner size={50} color="#3A2D28" />
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-5">
        <div className="my-5 bg-color3 p-10 space-y-3 rounded-3xl border-2 border-color1">
          <h1 className="lg:text-2xl md:text-xl text-lg font-bold">
            Violator ID : {caughtViolator!.id}
          </h1>
          <p className="lg:text-lg md:text-base text-sm">
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
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center border-2 mb-3 border-black bg-color4 p-3 rounded-t-lg shadow-md w-full lg:text-base md:text-sm sm:text-xs text-xxs space-x-2">
            <div className="flex-1 text-left">
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
            <div className="flex-1 text-center"></div>
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
                onCancel={handleCloseOptions}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViolatorDetailPage;
