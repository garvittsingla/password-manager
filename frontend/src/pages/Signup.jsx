import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrInsecure } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,seterror] = useState("")
  const navigate = useNavigate();


  const notify = () => toast.error("User already exists");


  const onSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post('http://localhost:8000/api/users', {
            firstname: firstname,
            email:email,
            password:password
          });
           
            navigate('/dashboard');
            console.log(res.data.token)
            localStorage.setItem("jsonwebtoken",res.data.token)
    }catch(err){
        seterror(err.response.data.message)
        notify()
    }
      
  };

  return (
    <div className='w-full h-screen bg-[#F4F2EC] flex flex-col gap-5 items-center justify-center bg-[length:40px_40px] !bg-[linear-gradient(to_right,_rgba(211,211,211,0.6)_0.6px,_transparent_0.6px),_linear-gradient(to_bottom,_rgba(211,211,211,0.6)_0.6px,_transparent_0.6px)]'>
      <ToastContainer />
      <h1 className='font-[Chillax_Variable] text-4xl mb-4 flex'><GrInsecure />PassValley</h1>
      <div className='min-w-80 min-h-[500px] relative'>
        <div className='absolute bg-[#45E372] h-[95%] w-[95%] right-0 bottom-0 rounded-lg border-black border-2'></div>
        <div className='absolute bg-[#B9F9CA] h-[95%] w-[95%] bottom-4 left-0 rounded-lg border-black border-[3px] flex flex-col items-center p-5'>
          <h2 className='text-2xl font-semibold mt-4 mb-6 flex gap-1'><FaUser />SignUp</h2>
          {error ? <div className='text-red-500 font-semibold'>{error}</div> : null}
          <form onSubmit={onSubmit} className='form h-[60%] w-full flex flex-col items-center gap-5'>
            <input onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" placeholder='Enter your name' id='firstname' className='w-[90%] h-10 pl-3 rounded-lg border-black border-[1px] focus:outline-none focus:ring-2 focus:ring-[#45E372]' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your Email' id='email' className='w-[90%] h-10 pl-3 rounded-lg border-black border-[1px] focus:outline-none focus:ring-2 focus:ring-[#45E372]' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter a password' id='password' className='w-[90%] h-10 pl-3 rounded-lg border-black border-[1px] focus:outline-none focus:ring-2 focus:ring-[#45E372]' />
            <button type='submit' className='w-[90%] h-10 bg-[#45E372] text-white font-semibold rounded-lg mt-4 border-black border-2 hover:bg-[#3ccf63] transition-all'>Sign Up</button>
          </form>
          <h3 className='mt-4'>Already Have an account? <button onClick={() => navigate('/login')} className='font-semibold hover:underline'>Sign In</button></h3>
        </div>
      </div>
    </div>
  );
};

export default Signup;