import SortButton from "../components/SortButton";
import ViolatorCard from "../components/ViolatorCard";
import EncodeButton from "../components/EncodeButton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

import { useViolators } from "../hooks/useViolators";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { role } = useParams<{ role: string }>();
  const { caughtViolatorList, loading } = useViolators();
  const [filteredUsers, setFilteredUsers] = useState(caughtViolatorList);

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

  useEffect(() => {
    setFilteredUsers(caughtViolatorList);
  }, [caughtViolatorList]);

  return (
    <div className="min-h-screen bg-color6 p-0 pb-10">
      <Header />
      <div className="flex flex-col items-center mb-5 mt-10">
          <SearchBar
            entries={caughtViolatorList}
            setFilteredEntries={setFilteredUsers}
          />
        <div
          className={`w-5/6 flex mt-2 ${
            role === "admin" ? "justify-between" : "justify-end"
          }`}>
          {role === "admin" && <EncodeButton />}
          <SortButton
            entries={filteredUsers!}
            setEntries={setFilteredUsers}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center border-2 mb-3 border-black bg-color3 p-3 rounded-t-lg shadow-md w-5/6 lg:text-base md:text-sm text-xs">
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

        {filteredUsers?.map((caughtViolator) => (
          <ViolatorCard
            key={caughtViolator.id}
            id={caughtViolator.id}
            name={`${caughtViolator.first_name} ${caughtViolator.last_name}`}
            age={getAge(caughtViolator.date_of_birth)}
            sex={caughtViolator.sex}
            latestViolationDate={
              caughtViolator.Violations.reverse()[0].violation_date
            }
            violationCount={caughtViolator.Violations.length}
          />
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
