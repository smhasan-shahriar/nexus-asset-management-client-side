import React from 'react';
import Heading from '../../Components/Shared/Heading/Heading';
import { FaPager, FaSuitcase, FaUsers } from 'react-icons/fa';
import { FcStatistics } from "react-icons/fc";
import { MdDashboardCustomize, MdEvent } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FaPenNib } from "react-icons/fa";
const About = () => {
    return (
        <div className='my-10 lg:my-20 px-2'>
            <Heading heading="About" subHeading="The Features"></Heading>
            <div className='shadow-xl flex flex-col lg:flex-row gap-5 items-center h-[320px] text-center'>
                <div className='font-extrabold text-3xl h-full lg:w-1/3 w-full min-w-[300px] bg-blue-300 flex items-center justify-center'>
                    For HR/Administration
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                        <FaSuitcase></FaSuitcase>
                        <p>Create Asset</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                        <FaPager></FaPager>
                        <p>Manage Assets</p>
                    </div>
                    <div className='flex flex-col text-center justify-center items-center gap-2 text-3xl'>
                        <FaUsers></FaUsers>
                        <p>Manage Team</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                    <FcStatistics />
                        <p>Real Time Stat</p>
                    </div>
                </div>
                
            </div>
            <div className='shadow-xl flex flex-col lg:flex-row gap-5 items-center h-[300px] my-5 text-center'>
                <div className='font-extrabold text-3xl h-full lg:w-1/3 w-full min-w-[300px] bg-blue-300 flex items-center justify-center'>
                    For Employees
                </div>
                <div className='grid  grid-cols-2 lg:grid-cols-4  gap-5'>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                        <FaPenNib />
                        <p>Request Asset</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                        <MdDashboardCustomize />
                        <p>Custom Request</p>
                    </div>
                    <div className='flex flex-col text-center justify-center items-center gap-2 text-3xl'>
                        <MdEvent />
                        <p>Events</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-3xl'>
                    <ImProfile />
                        <p>Manage Profile</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default About;