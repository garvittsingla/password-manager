import React, { useState, useEffect } from 'react';
import { GrInsecure } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [singlepassword, setsinglepassword] = useState('');
  const [siteurl, setsiteurl] = useState('');
  const [all, setall] = useState([]);
  const token = localStorage.getItem('jsonwebtoken');
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const notify = () => toast.success("Password saved");

  const getpasswords = async () => {
    const res = await axios.get("http://localhost:8000/api/passwords/", config);
    setall(res.data.passwords);
  };

  const handlebutton = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/passwords/", {
        singlepassword: singlepassword,
        siteurl: siteurl
      }, config);
      notify();
      getpasswords();
      setsiteurl("")
      setsinglepassword("")
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setall(all.filter(password => password._id !== id));
  };

  useEffect(() => {
    getpasswords();
  }, [handlebutton]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='w-full h-screen bg-[#F4F2EC] pt-5 bg-[length:40px_40px] !bg-[linear-gradient(to_right,_rgba(211,211,211,0.6)_0.6px,_transparent_0.6px),_linear-gradient(to_bottom,_rgba(211,211,211,0.6)_0.6px,_transparent_0.6px)]'>
      <ToastContainer />
      <nav className='max-w-screen-lg mx-auto h-10 flex justify-between px-4 md:px-8'>
        <div className="left flex font-semibold text-3xl "> <GrInsecure></GrInsecure>PassValley</div>
        <div className='right flex'><button onClick={logout} className='flex items-center gap-2 justify-center hover:underline'>Logout<IoLogOut /></button></div>
      </nav>
      <header className='mt-4 max-w-screen-xl h-40 mx-auto px-4 md:px-8'>
        <img src="banner.gif" className='h-[100%] w-[100%] object-cover rounded-lg' alt="" />
      </header>
      <main>
        <div className='addpass max-w-screen-xl px-4 h-32 mx-auto mt-10 flex flex-col md:flex-row items-center justify-center gap-4'>
          <input onChange={(e) => setsiteurl(e.target.value)} value={siteurl} type="text" placeholder='Enter site Url' className='px-2 py-3 border-black border-[1px] focus:outline-none rounded-lg w-full md:w-[33%]' />
          <input onChange={(e) => setsinglepassword(e.target.value)} value={singlepassword} type="password" placeholder='Enter Password' className='px-2 py-3 border-black border-[1px] focus:outline-none rounded-lg w-full md:w-[33%]' />
          <button className='px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 border-black border-[1px] w-full md:w-auto ' onClick={handlebutton}>Save</button>
        </div>
      </main>
      <section className='passwords max-w-screen-xl h-60 mx-4 md:mx-auto p-4 rounded-lg  mt-10 md:mt-1 '>
        <div className='min-w-80 h-[275px] relative'>
          <div className='absolute bg-[#45E372] h-[95%] w-[95%] right-10 bottom-0 rounded-lg border-black border-2'></div>
          <div className='absolute bg-[#B9F9CA] h-[95%] w-[95%] bottom-4 left-0 rounded-lg border-black border-[3px] flex flex-col items-center pt-1'>
           <h2 className='text-xl  font-[Chillax_Variable]'>Saved Passwords</h2>
           <div className='w-full h-10  flex items-center px-5 md:px-[125px] gap-10 md:gap-20'>
            <h1 className='italic '>SiteUrl</h1>
            <h1 className='italic'>Password</h1>
           </div>
           <div className='overflow-auto w-[90%]'>
            {all.map((elem) => (
              <Card key={elem._id} id={elem._id} siteurl={elem.siteurl} singlepassword={elem.singlepassword} onDelete={handleDelete} />
            ))}
           </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;