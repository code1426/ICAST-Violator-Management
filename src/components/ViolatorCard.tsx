import { useNavigate } from 'react-router-dom';

interface ViolatorProps {
  id: string;
  name: string;
  placeOfViolation: string;
  date: string;
  age: number;
  sex: string;
  apprehendorType: string;
  apprehendorName: string;
  ORNumber: number;
  paidStatus: boolean;
}

const ViolatorCard = ({
  id,
  name,
  placeOfViolation,
  date,
  age,
  sex,
  apprehendorType,
  apprehendorName,
  ORNumber,
  paidStatus,
}: ViolatorProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer mb-2 m-4 w-5/6'
      onClick={() => navigate(`/detail/${id}`)}>
      <div className='flex-1 pr-5 text-left'>
        <span className='text-bs font-medium'>{name}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{placeOfViolation}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{age}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{sex}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{apprehendorType}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{apprehendorName}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{date}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{ORNumber}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>
          {paidStatus ? 'Paid' : 'Unpaid'}
        </span>
      </div>
    </div>
  );
};

export default ViolatorCard;
