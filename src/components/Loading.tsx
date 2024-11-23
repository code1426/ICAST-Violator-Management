import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const Loading = ({ message="" }: { message: string}) => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-color6">
      <Spinner size={50} color="#3A2D28" />
      <p>{message}</p>
    </div>
  );
};

export default Loading;
