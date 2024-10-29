import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import SortButton from "../components/SortButton";
import ViolatorCard from "../components/ViolatorCard";
import { useViolators } from "../hooks/useViolators";
import EncodeButton from "../components/EncodeButton";

const HomePage = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  const { violators, setViolators, loading } = useViolators();

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      <header className="flex justify-center items-center mb-6 bg-beige-color">
        <h1 className="text-2xl font-bold text-center">
          ILOILO CITY ANTI-SMOKING TASK FORCE
        </h1>
      </header>

      <div className="flex flex-col items-center mb-4 m-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="w-5/6 flex justify-between mt-2">
          {role === "admin" && (<EncodeButton />)}
          <SortButton entries={violators!} setEntries={setViolators} />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-between bg-gray-300 p-3 rounded-t-lg shadow-md w-5/6">
          <div className="flex-1 text-left">
            <span className="font-bold">Name</span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold">Address</span>
          </div>
          <div className="flex-1 text-right">
            <span className="font-bold">Date</span>
          </div>
        </div>

        {violators?.map((violator) => (
          <ViolatorCard
            key={violator.violator_id}
            id={violator.violator_id}
            name={`${violator.first_name} ${violator.last_name}`}
            address={violator.address}
            date={violator.date_of_birth}
            onClick={() => navigate(`/detail/${violator.violator_id}`)}
          />
        ))}
        {loading && (
          <div className="flex text-lg justify-self-center self-center font-semibold p-12">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
