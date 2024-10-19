import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SortButton from '../components/SortButton';
import ViolatorCard from '../components/ViolatorCard';

interface Entry {
  id: number;
  name: string;
  address: string;
  date: string;
}

const HomePage = () => {
  const initialEntries: Entry[] = [
    { id: 1001, name: 'Gerona, John Patrick', address: 'Balabago', date: '10/20/2024' },
    { id: 1002, name: 'Alair, Shawn Khennee', address: 'Lapaz', date: '10/21/2024' },
    { id: 1003, name: 'Casio, John Rofer', address: 'Pavia', date: '10/22/2024' },
    { id: 1004, name: 'Vergara, Kimly John', address: 'Calinog', date: '10/23/2024' },
  ];

  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      <header className="flex justify-center items-center mb-6 bg-beige-color">
        <h1 className="text-2xl font-bold text-center">ILOILO CITY ANTI-SMOKING TASK FORCE</h1>
      </header>

      <div className="flex flex-col items-center mb-4 m-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg p-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="w-5/6 flex justify-end mt-2">
          <SortButton entries={entries} setEntries={setEntries} />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-between bg-gray-300 p-3 rounded-t-lg shadow-md w-5/6">
          <div className="flex-1 text-left"><span className="font-bold">Name</span></div>
          <div className="flex-1 text-center"><span className="font-bold">Address</span></div>
          <div className="flex-1 text-right"><span className="font-bold">Date</span></div>
        </div>

        {entries.map(entry => (
          <ViolatorCard
            key={entry.id}
            id={entry.id}
            name={entry.name}
            address={entry.address}
            date={entry.date}
            onClick={() => navigate(`/detail/${entry.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
