import { useParams } from 'react-router-dom';
import { useViolator } from '../hooks/useViolator';
import ViolationsCard from '../components/ViolationsCard';
import Header from '../components/Header';

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    caughtViolator,
    violations: ViolationsList,
    loading,
  } = useViolator(id!);
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
      <div className='flex text-lg justify-self-center self-center font-semibold p-12'>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='flex flex-col p-5'>
        <div className='my-5 bg-color3 p-10 space-y-3 rounded-3xl border-2 border-color1'>
          <h1 className='lg:text-2xl md:text-xl text-lg font-bold'>
            Violator ID : {caughtViolator!.id}
          </h1>
          <p className='lg:text-lg md:text-base text-sm'>
            Name :{' '}
            {caughtViolator!.first_name + ' ' + caughtViolator!.last_name}
          </p>
          <p className='lg:text-lg md:text-base text-sm'>
            Address : {caughtViolator!.address}
          </p>
          <p className='lg:text-lg md:text-base text-sm'>
            Age : {getAge(caughtViolator!.date_of_birth)}
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center border-2 mb-3 border-black bg-color4 p-3 rounded-t-lg shadow-md w-full lg:text-base text-xs space-x-2'>
            <div className='flex-1 text-left'>
              <span className='font-bold'>Violation Date</span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>Place of Violation</span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>Violator Type</span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>Apprehender Name </span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>Apprehender Type</span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>OR No. </span>
            </div>
            <div className='flex-1 text-center'>
              <span className='font-bold'>Status</span>
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
    </div>
  );
};

export default ViolatorDetailPage;
