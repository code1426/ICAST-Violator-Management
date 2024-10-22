import { useParams } from 'react-router-dom';

const entryData = [
  {
    id: 1001,
    name: 'Gerona, John Patrick',
    address: 'Balabago',
    date: '10/20/2024',
  },
  {
    id: 1002,
    name: 'Alair, Shawn Khennee',
    address: 'Lapaz',
    date: '10/21/2024',
  },
  { id: 1003, name: 'Casio, John Rofer', address: 'Pavia', date: '10/22/2024' },
  {
    id: 1004,
    name: 'Vergara, Kimly John',
    address: 'Calinog',
    date: '10/23/2024',
  },
];

const ViolatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const entry = entryData.find((entry) => entry.id.toString() === id);

  if (!entry) {
    return <h1 className='text-4xl font-bold'>Violator not found</h1>;
  }

  return (
    <div className='flex flex-col justify-start items-start h-screen bg-gray-100 p-6'>
      <h1 className='text-4xl font-bold mb-4'>Violator ID : {entry.id}</h1>
      <p className='mt-4 text-lg'>Name : {entry.name}</p>
      <p className='mt-4 text-lg'>Address : {entry.address}</p>
      <p className='mt-2 text-lg'>Date : {entry.date}</p>
    </div>
  );
};

export default ViolatorDetailPage;
