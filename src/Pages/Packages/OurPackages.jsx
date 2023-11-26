import React from 'react';
import OurPackageCard from './OurPackageCard';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const OurPackages = () => {
   
    return (
        <div>
                <h1 className='text-5xl w-full bg-black flex justify-center items-center text-white py-20'>Packages Available</h1>
                <Helmet>
                    <title>Nexus | Our Packages</title>
                </Helmet>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20'>
                <OurPackageCard pack={"basic"} employeeNumber={5} price={5} ></OurPackageCard>
                <OurPackageCard pack={"standard"} employeeNumber={10} price={8} ></OurPackageCard>
                <OurPackageCard pack={"advanced"} employeeNumber={20} price={15} ></OurPackageCard>
            </div>
        </div>
    );
};

export default OurPackages;