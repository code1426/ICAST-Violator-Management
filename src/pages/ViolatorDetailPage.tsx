import { useParams } from "react-router-dom";
import { useViolator } from "../hooks/useViolator";

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { violator, loading } = useViolator(id!);

  if (loading) {
    return <div className="flex text-lg justify-self-center self-center font-semibold p-12">
    Loading...
  </div>;
  }

  return (
    <div className="flex flex-col justify-start items-start h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">
        Violator ID : {violator!.violator_id}
      </h1>
      <p className="mt-4 text-lg">
        Name : {violator!.first_name + " " + violator!.last_name}
      </p>
      <p className="mt-4 text-lg">Address : {violator!.address}</p>
      <p className="mt-2 text-lg">Date : {violator!.date_of_birth}</p>
    </div>
  );
};

export default ViolatorDetailPage;
