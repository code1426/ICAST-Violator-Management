import { useParams } from "react-router-dom";
import { useViolator } from "../hooks/useViolator";
import ViolationsCard from "../components/ViolationsCard";

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { caughtViolator, loading } = useViolator(id!);
  const { violations: ViolationsList } = useViolator(id!);

  if (loading) {
    return (
      <div className="flex text-lg justify-self-center self-center font-semibold p-12">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">
        Violator ID : {caughtViolator!.id}
      </h1>
      <p className="mt-4 text-lg">
        Name : {caughtViolator!.first_name + " " + caughtViolator!.last_name}
      </p>
      <p className="mt-4 text-lg">Address : {caughtViolator!.address}</p>
      <p className="mt-2 text-lg">Date : {caughtViolator!.date_of_birth}</p>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-lg cursor-pointer mb-2 m-4 h-14  w-full">
          <div className="flex-1 pr-5  text-left ">
            <span className="font-bold">Violation Date</span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">Place of Violation</span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">Violator Type</span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">Apprehender Name </span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">Apprehender Type</span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">OR No. </span>
          </div>
          <div className="flex-1 ml-7 text-center">
            <span className="font-bold">Status</span>
          </div>
        </div>
        {ViolationsList?.map((violations) => (
          <ViolationsCard
            key={violations.id}
            id={violations.id}
            violation_date={violations.violation_date}
            violation_place={violations.violation_place}
            violator_type={violations.violator_type}
            apprehender_name={violations.apprehender_name}
            apprehender_type={violations.apprehender_type}
            OR_number={violations.OR_number}
            paid={violations.paid}
          />
        ))}
      </div>
    </div>
  );
};

export default ViolatorDetailPage;
