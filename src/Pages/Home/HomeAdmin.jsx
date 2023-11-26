import React from 'react';
import useRole from '../../Hooks/useRole';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import PendingRequestAll from './PendingRequestAll';
import LimitedStockSection from './LimitedStockSection';


const HomeAdmin = () => {

    return (
        <div>
            <PendingRequestAll></PendingRequestAll>
            <LimitedStockSection></LimitedStockSection>
        </div>
    );
};

export default HomeAdmin;