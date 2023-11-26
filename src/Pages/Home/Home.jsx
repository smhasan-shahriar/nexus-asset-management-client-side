import React from 'react';
import Banner from './Banner';
import Package from './Package';
import About from './About';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Nexus Asset Management</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <Package></Package>
        </div>
    );
};

export default Home;