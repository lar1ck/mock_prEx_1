import { useEffect, useState } from 'react';
import axios from 'axios';
import type TraineeProps from '../../types/types';
import type TradeProps from '../../types/types';


const TraineeManager = () => {
    const [trainees, setTrainees] = useState<TraineeProps[]>([]);
    const [trades, setTrades] = useState<TradeProps[]>([]);
    const [form, setForm] = useState({
        FirstNames: '',
        LastName: '',
        Gender: '',
        Trade_Id: 0,
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchTrainees = async () => {
        const res = await axios.get('http://localhost:4500/api/trainees');
        setTrainees(res.data);
    };

    const fetchTrades = async () => {
        const res = await axios.get('http://localhost:4500/api/trades');
        setTrades(res.data);
    };

    useEffect(() => {
        fetchTrainees();
        fetchTrades();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'Trade_Id' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const normalizedFirstName = form.FirstNames.toLowerCase().trim();
        const normalizedLastName = form.LastName.toLowerCase().trim();
        const normalizedGender = form.Gender.toLowerCase().trim();
        const tradeId = form.Trade_Id;
      
        const isExactDuplicate = trainees.some(t =>
          t.FirstNames.toLowerCase().trim() === normalizedFirstName &&
          t.LastName.toLowerCase().trim() === normalizedLastName &&
          t.Gender.toLowerCase().trim() === normalizedGender &&
          t.Trade_Id === tradeId
        );
      
        if (!editingId && isExactDuplicate) {
          alert('This exact trainee already exists.');
          return;
        }
      
        try {
          if (editingId) {
            await axios.put(`http://localhost:4500/api/trainees/${editingId}`, form);
          } else {
            await axios.post('http://localhost:4500/api/trainees', form);
          }
      
          setForm({ FirstNames: '', LastName: '', Gender: '', Trade_Id: 0 });
          setEditingId(null);
          fetchTrainees();
        } catch (error) {
          console.error('Error saving trainee:', error);
          alert('Error saving trainee. Please try again.');
        }
      };

    const handleEdit = (t: TraineeProps) => {
        setForm({
            FirstNames: t.FirstNames,
            LastName: t.LastName,
            Gender: t.Gender,
            Trade_Id: t.Trade_Id,
        });
        setEditingId(t.Trainees_Id);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:4500/api/trainees/${id}`);
        fetchTrainees();
    };

    return (
        <div className="max-w-xl mx-auto py-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    type="text"
                    name="FirstNames"
                    placeholder="First Names"
                    className="border px-4 py-2 w-full"
                    value={form.FirstNames}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    className="border px-4 py-2 w-full"
                    value={form.LastName}
                    onChange={handleChange}
                    required
                />
                <select
                    name="Gender"
                    className="border px-4 py-2 w-full"
                    value={form.Gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select
                    name="Trade_Id"
                    className="border px-4 py-2 w-full"
                    value={form.Trade_Id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Trade</option>
                    {trades.map((trade) => (
                        <option key={trade.Trade_Id} value={trade.Trade_Id}>
                            {trade.Trade_Name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? 'Update Trainee' : 'Add Trainee'}
                </button>
            </form>

            {trainees.length === 0 ? (
                <div>No Trainees Yet</div>
            ) : (
                <div className="space-y-2">
                    {trainees.map((t) => (
                        <div
                            key={t.Trainees_Id}
                            className="flex justify-between items-center border p-2 rounded"
                        >
                            <div>
                                <p className="font-semibold">
                                    {t.FirstNames} {t.LastName}
                                </p>
                                <p className="text-sm text-gray-600">Gender: {t.Gender}</p>
                                <p className="text-sm text-gray-600">
                                    Trade: {trades.find(trade => trade.Trade_Id === t.Trade_Id)?.Trade_Name || 'Unknown'}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(t)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(t.Trainees_Id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TraineeManager;
