import React from 'react';
import Banner from './Banner';
import Package from './Package';
import About from './About';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Package></Package>
        </div>
    );
};

export default Home;