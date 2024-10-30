import { useParams } from 'react-router-dom';

import SortButton from '../components/SortButton';
import ViolatorCard from '../components/ViolatorCard';
import { useViolators } from '../hooks/useViolators';
import EncodeButton from '../components/EncodeButton';

const HomePage = () => {
  const { role } = useParams<{ role: string }>();
  const { caughtViolatorList, setViolators, loading } = useViolators();

  function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-0'>
      <header className='flex justify-center items-center mb-6 bg-beige-color'>
        <h1 className='text-2xl font-bold text-center'>
          ILOILO CITY ANTI-SMOKING TASK FORCE
        </h1>
      </header>

      <div className='flex flex-col items-center mb-4'>
        <input
          type='text'
          placeholder='Search...'
          className='border border-gray-300 rounded-lg p-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500'
        />
        <div
          className={`w-5/6 flex mt-2 ${
            role === "admin" ? "justify-between" : "justify-end"
          }`}
        >
          {role === "admin" && <EncodeButton />}
          <SortButton entries={caughtViolatorList!} setEntries={setViolators} />

        </div>
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex justify-between items-center bg-gray-300 p-3 rounded-t-lg shadow-md w-5/6'>
          <div className='flex-1 pr-5 text-left'>
            <span className='font-bold'>Name</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Place of Violation</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Age</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Sex</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Apprehendor Type</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Apprehendor Name</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Date</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>OR Number</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Status</span>
          </div>
        </div>

        {caughtViolatorList?.map((caughtViolator) => (
          <ViolatorCard
            key={caughtViolator.id}
            id={caughtViolator.id}
            name={`${caughtViolator.first_name} ${caughtViolator.last_name}`}
            placeOfViolation={caughtViolator.address}
            date={caughtViolator.Violations.reverse()[0].violation_date}
            age={getAge(caughtViolator.date_of_birth)}
            sex={caughtViolator.sex}
            apprehendorType={caughtViolator.Violations.reverse()[0].apprehender_type}
            apprehendorName={caughtViolator.Violations.reverse()[0].apprehender_name}
            ORNumber={caughtViolator.Violations.reverse()[0].OR_number}
            paidStatus={caughtViolator.Violations.reverse()[0].paid}
          />
        ))}
        {loading && (
          <div className='flex text-lg justify-self-center self-center font-semibold p-12'>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
