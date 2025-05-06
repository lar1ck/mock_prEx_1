import { useEffect, useState } from 'react';
import axios from 'axios';
import type TradeProps  from '../../types/types';

const TradeManager = () => {
  const [trades, setTrades] = useState<TradeProps[]>([]);
  const [tradeName, setTradeName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTrades = async () => {
    const res = await axios.get('http://localhost:4500/api/trades/');
    setTrades(res.data);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:4500/api/trades/${editingId}`, { Trade_Name: tradeName });
    } else {
      await axios.post('http://localhost:4500/api/trades', { Trade_Name: tradeName });
    }
    setTradeName('');
    setEditingId(null);
    fetchTrades();
  };

  const handleEdit = (trade: TradeProps) => {
    setTradeName(trade.Trade_Name);
    setEditingId(trade.Trade_Id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4500/api/trades/${id}`);
    fetchTrades();
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter trade name"
          className="border px-4 py-2 w-full mb-2"
          value={tradeName}
          onChange={(e) => setTradeName(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update Trade' : 'Add Trade'}
        </button>
      </form>

        {trades.length == 0 && (
            <div>
                No Trades Yet
            </div>
        )}
      <div className="space-y-2">
        {trades.map((trade) => (
          <div
            key={trade.Trade_Id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{trade.Trade_Name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(trade)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trade.Trade_Id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeManager;
