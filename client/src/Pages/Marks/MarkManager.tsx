import { useEffect, useState } from 'react';
import axios from 'axios';
import type MarkProps from '../../types/types';
import type TraineeProps from '../../types/types';
import type TradeProps from '../../types/types';
import type ModuleProps from '../../types/types';
import type UserProps from '../../types/types';

const MarkManager = () => {
    const [marks, setMarks] = useState<MarkProps[]>([]);
    const [trainees, setTrainees] = useState<TraineeProps[]>([]);
    const [trades, setTrades] = useState<TradeProps[]>([]);
    const [modules, setModules] = useState<ModuleProps[]>([]);
    const [users, setUsers] = useState<UserProps[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        Trainee_Id: 0,
        Trade_Id: 0,
        Module_Id: 0,
        User_Id: 0,
        Formative_Ass: 0,
        Summative_Ass: 0,
        Comprehensive_Ass: 0,
        Total_Marks_100: 0,
    });

    const fetchAll = async () => {
        const [m, t, tr, mod, u] = await Promise.all([
            axios.get('http://localhost:4500/api/marks'),
            axios.get('http://localhost:4500/api/trainees'),
            axios.get('http://localhost:4500/api/trades'),
            axios.get('http://localhost:4500/api/modules'),
            axios.get('http://localhost:4500/api/users'),
        ]);
        setMarks(m.data);
        setTrainees(t.data);
        setTrades(tr.data);
        setModules(mod.data);
        setUsers(u.data);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsedValue = Number(value);

        if (['Formative_Ass', 'Summative_Ass', 'Comprehensive_Ass'].includes(name)) {
            if (parsedValue < 0 || parsedValue > 100) return;
        }

        setForm((prev) => {
            const newForm = { ...prev, [name]: parsedValue };

            const total = newForm.Formative_Ass + newForm.Summative_Ass + newForm.Comprehensive_Ass;
            newForm.Total_Marks_100 = Math.round(total / 3);

            return newForm;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`http://localhost:4500/api/marks/${editingId}`, form);
        } else {
            await axios.post('http://localhost:4500/api/marks', form);
        }
        setForm({
            Trainee_Id: 0,
            Trade_Id: 0,
            Module_Id: 0,
            User_Id: 0,
            Formative_Ass: 0,
            Summative_Ass: 0,
            Comprehensive_Ass: 0,
            Total_Marks_100: 0,
        });
        setEditingId(null);
        fetchAll();
    };

    const handleEdit = (mark: MarkProps) => {
        setForm({ ...mark });
        setEditingId(mark.Mark_Id);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:4500/api/marks/${id}`);
        fetchAll();
    };

    return (
        <div className="max-w-2xl mx-auto py-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <select name="Trainee_Id" value={form.Trainee_Id} onChange={handleChange} className="border w-full px-4 py-2" required>
                    <option value="">Select Trainee</option>
                    {trainees.map(t => (
                        <option key={t.Trainees_Id} value={t.Trainees_Id}>{t.FirstNames} {t.LastName}</option>
                    ))}
                </select>

                <select name="Trade_Id" value={form.Trade_Id} onChange={handleChange} className="border w-full px-4 py-2" required>
                    <option value="">Select Trade</option>
                    {trades.map(tr => (
                        <option key={tr.Trade_Id} value={tr.Trade_Id}>{tr.Trade_Name}</option>
                    ))}
                </select>

                <select name="Module_Id" value={form.Module_Id} onChange={handleChange} className="border w-full px-4 py-2" required>
                    <option value="">Select Module</option>
                    {modules.map(m => (
                        <option key={m.Module_Id} value={m.Module_Id}>{m.ModName}</option>
                    ))}
                </select>

                <select name="User_Id" value={form.User_Id} onChange={handleChange} className="border w-full px-4 py-2" required>
                    <option value="">Select User</option>
                    {users.map(u => (
                        <option key={u.Users_Id} value={u.Users_Id}>{u.UserName}</option>
                    ))}
                </select>

                <input type="number" name="Formative_Ass" value={form.Formative_Ass} onChange={handleChange} className="border w-full px-4 py-2" placeholder="Formative Assessment" required />
                <input type="number" name="Summative_Ass" value={form.Summative_Ass} onChange={handleChange} className="border w-full px-4 py-2" placeholder="Summative Assessment" required />
                <input type="number" name="Comprehensive_Ass" value={form.Comprehensive_Ass} onChange={handleChange} className="border w-full px-4 py-2" placeholder="Comprehensive Assessment" required />

                <div className="text-right text-sm text-gray-500">
                    Total (Average): {form.Total_Marks_100} / 100
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? 'Update Mark' : 'Add Mark'}
                </button>
            </form>

            <div className="space-y-2">
            {marks.map((m) => {
                    const trainee = trainees.find(t => t.Trainees_Id === m.Trainee_Id);
                    const module = modules.find(mod => mod.Module_Id === m.Module_Id);
                    
                    return (
                        <div key={m.Mark_Id} className="border p-2 rounded flex justify-between items-center">
                            <div>
                                <p><strong>Trainee:</strong> {trainee ? `${trainee.FirstNames} ${trainee.LastName}` : 'Unknown'}</p>
                                <p><strong>Module:</strong> {module?.ModName || 'Unknown'}</p>
                                <p className="text-sm text-gray-600">
                                    Formative: {m.Formative_Ass} | Summative: {m.Summative_Ass} | Comprehensive: {m.Comprehensive_Ass}
                                </p>
                                <p><strong>Total:</strong> {m.Total_Marks_100}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(m)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(m.Mark_Id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarkManager;
