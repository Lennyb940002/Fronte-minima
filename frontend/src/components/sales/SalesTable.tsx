import { useNavigate } from 'react-router-dom';

export function SalesTable() {
  const navigate = useNavigate();

  const handleTableClick = () => {
    navigate('/e-commerce/table');
  };

  return (
    <div
      className="bg-black border border-white rounded-[28px] text-center p-6 cursor-pointer hover:opacity-80 transition-opacity"
      style={{ height: '130%' }}
      onClick={handleTableClick}
    >
      <h3 className="text-white text-2xl font-bold mb-6">Tableau</h3>
      <div className="border border-white rounded">
        <img src="" alt="" />
      </div>
    </div>
  );
}