import React from 'react';
import Heading from '../../Components/Shared/Heading/Heading';
import PackageCard from './PackageCard';

const Package = () => {
    return (
        <div className='my-10 lg:my-20'>
            <Heading heading="Our Packages" subHeading="pricing"></Heading>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <PackageCard pack={"Basic"} employeeNumber={5} price={5} ></PackageCard>
                <PackageCard pack={"Standard"} employeeNumber={10} price={8} ></PackageCard>
                <PackageCard pack={"Advanced"} employeeNumber={20} price={15} ></PackageCard>
            </div>
        </div>
    );
};

export default Package;