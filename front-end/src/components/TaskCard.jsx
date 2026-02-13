import { useState, useEffect } from 'react';
import api from '../api/axios';

const TaskCard = ({ task }) => {
    const [authorName, setAuthorName] = useState('Unknown');

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                if (task.idUser) {
                    const response = await api.get(`/user/${task.idUser}`);
                    setAuthorName(response.data.username);
                }
            } catch (error) {
                console.error("Error fetching author", error);
            }
        };
        fetchAuthor();
    }, [task.idUser]);

    const date = new Date(task.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{task.title}</h3>
                <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    backgroundColor: task.status === 'completed' ? '#d4edda' : '#fff3cd',
                    color: task.status === 'completed' ? '#155724' : '#856404'
                }}>
                    {task.status}
                </span>
            </div>
            <p style={{ color: '#555', marginBottom: '1rem' }}>{task.description || 'No description'}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888' }}>
                <span>{date}</span>
                <span style={{ color: '#007bff' }}>Par: {authorName}</span>
            </div>
        </div>
    );
};

export default TaskCard;
