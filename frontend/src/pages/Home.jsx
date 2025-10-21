import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

export const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }



        } catch (err) {
            console.log(err)
        }
    }



    return (

        <div className="">
            <button onClick={handleLogout}>logout</button>
        </div>

    )
}
