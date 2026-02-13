import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await api.get('/task');
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
            if (error.response && error.response.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ margin: 0 }}>Your Tasks</h1>
                        <p style={{ margin: 0, color: '#666' }}>Manage your daily workflow</p>
                    </div>
                    <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                    <div>
                        {tasks.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No tasks found. Create one!</p>
                        ) : (
                            tasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <TaskForm onTaskCreated={fetchTasks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
