import React from 'react';

const Heading = ({heading, subHeading}) => {
    return (
        <div className='md:w-4/12 mx-auto text-center my-8'>
            <p className='text-yellow-600 mb-2 uppercase' >{subHeading}</p>
            <h3 className='text-3xl  border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default Heading;