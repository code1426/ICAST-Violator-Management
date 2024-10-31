import { useNavigate } from 'react-router-dom';

interface ViolatorProps {
  id: string;
  name: string;
  placeOfViolation: string;
  latestViolationDate: string;
}

const ViolatorCard = ({
  id,
  name,
  placeOfViolation,
  latestViolationDate,
}: ViolatorProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer mb-2 m-4 w-5/6'
      onClick={() => navigate(`/detail/${id}`)}>
      <div className='flex-1 text-left'>
        <span className='text-bs font-medium'>{name}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{placeOfViolation}</span>
      </div>
      <div className='flex-1 text-center'>
        <span className='text-bs font-medium'>{latestViolationDate}</span>
      </div>
    </div>
  );
};

export default ViolatorCard;
