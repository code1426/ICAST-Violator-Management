import { useParams } from 'react-router-dom';

import SortButton from '../components/SortButton';
import ViolatorCard from '../components/ViolatorCard';
import { useViolators } from '../hooks/useViolators';
import EncodeButton from '../components/EncodeButton';
import Header from '../components/Header';

const HomePage = () => {
  const { role } = useParams<{ role: string }>();
  const { caughtViolatorList, setViolators, loading } = useViolators();

  return (
    <div className='min-h-screen bg-white p-0'>
      <Header />
      <div className='flex flex-col items-center mb-5 mt-10'>
        <div className='flex rounded-3xl px-6 py-3 w-5/6 bg-color3 space-x-2'>
          <input
            type='text'
            placeholder='Search...'
            className='border-2 border-black rounded-full px-5 py-1 w-5/6 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 lg:text-base md:text-sm text-xs'
          />
          <button className='bg-color1 hover:bg-color2 rounded-full py-1 text-white w-1/6 lg:text-base md:text-sm text-xs'>
            Search
          </button>
        </div>
        <div
          className={`w-5/6 flex mt-2 ${
            role === 'admin' ? 'justify-between' : 'justify-end'
          }`}>
          {role === 'admin' && <EncodeButton />}
          <SortButton
            entries={caughtViolatorList!}
            setEntries={setViolators}
          />
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex justify-between items-center border-2 mb-3 border-black bg-color4 p-3 rounded-t-lg shadow-md w-5/6 lg:text-base md:text-sm text-xs'>
          <div className='flex-1 text-left'>
            <span className='font-bold'>Name</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Place of Violation</span>
          </div>
          <div className='flex-1 text-center'>
            <span className='font-bold'>Latest Violation Date</span>
          </div>
        </div>

        {caughtViolatorList?.map((caughtViolator) => (
          <ViolatorCard
            key={caughtViolator.id}
            id={caughtViolator.id}
            name={`${caughtViolator.first_name} ${caughtViolator.last_name}`}
            placeOfViolation={caughtViolator.address}
            latestViolationDate={
              caughtViolator.Violations.reverse()[0].violation_date
            }
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
