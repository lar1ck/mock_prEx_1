import { useEffect, useState } from 'react';
import axios from 'axios';
import type ModuleProps from '../../types/types';

const ModuleManager = () => {
  const [modules, setModules] = useState<ModuleProps[]>([]);
  const [modName, setModName] = useState('');
  const [modCredits, setModCredits] = useState<number>();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchModules = async () => {
    const res = await axios.get('http://localhost:4500/api/modules');
    setModules(res.data);
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const normalizedName = modName.trim().toLowerCase();
  
    const isDuplicate = modules.some(
      (mod) => mod.ModName.trim().toLowerCase() === normalizedName
    );
  
    if (!editingId && isDuplicate) {
      alert('Module already exists!');
      return;
    }
  
    const payload = {
      ModName: modName,
      ModCredits: modCredits,
    };
  
    if (editingId) {
      await axios.put(`http://localhost:4500/api/modules/${editingId}`, payload);
    } else {
      await axios.post('http://localhost:4500/api/modules', payload);
    }
  
    setModName('');
    setModCredits(0);
    setEditingId(null);
    fetchModules();
  };
  const handleEdit = (mod: ModuleProps) => {
    setModName(mod.ModName);
    setModCredits(mod.ModCredits);
    setEditingId(mod.Module_Id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4500/api/modules/${id}`);
    fetchModules();
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Module Name"
          className="border px-4 py-2 w-full"
          value={modName}
          onChange={(e) => setModName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Module Credits"
          className="border px-4 py-2 w-full"
          value={modCredits}
          onChange={(e) => setModCredits(Number(e.target.value))}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editingId ? 'Update Module' : 'Add Module'}
        </button>
      </form>

      {modules.length === 0 ? (
        <div className="text-center text-gray-500">No Modules Yet</div>
      ) : (
        <div className="space-y-2">
          {modules.map((mod) => (
            <div
              key={mod.Module_Id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{mod.ModName}</p>
                <p className="text-sm text-gray-500">Credits: {mod.ModCredits}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(mod)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mod.Module_Id)}
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

export default ModuleManager;
