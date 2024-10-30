import { useParams } from "react-router-dom";
import { useViolator } from "../hooks/useViolator";

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { caughtViolator, loading } = useViolator(id!);

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
    </div>
  );
};

export default ViolatorDetailPage;
