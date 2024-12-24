import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const Card = ({ siteurl, singlepassword, id, onDelete }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jsonwebtoken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`https://password-manager-skdj.onrender.com/api/passwords/${id}`, config);
            onDelete(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='password-item flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg border-black border-[1px] shadow-md w-full'>
            <div className='flex items-center gap-5 w-full md:w-[70%]'>
                <img src={`https://${siteurl}/favicon.ico`} alt="Site" className='h-8 w-8 rounded-full' />
                <span className='font-medium'>{siteurl}</span>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={singlepassword}
                    className='border-none bg-transparent focus:outline-none' 
                    readOnly 
                />
            </div>
            <div className='flex items-center gap-2 mt-2 md:mt-0 w-full md:w-[30%] justify-end flex-shrink-0'>
                <button 
                    className='text-blue-500 hover:underline flex items-center gap-1 text-xl' 
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button 
                    className='text-red-500 hover:underline flex items-center gap-1 text-xl' 
                    onClick={handleDelete}
                >
                    <MdDelete />
                </button>
            </div>
        </div>
    );
};

export default Card;