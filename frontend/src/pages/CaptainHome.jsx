import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const CaptainHome = () => {
    const navigate = useNavigate();

    const handleCaptainLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            captain home
            <button onClick={handleCaptainLogout}>Logout</button>
        </div>
    )
}
