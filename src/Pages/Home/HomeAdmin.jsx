import React from 'react';
import useRole from '../../Hooks/useRole';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import PendingRequestAll from './PendingRequestAll';
import LimitedStockSection from './LimitedStockSection';
import MostRequestedAdmin from './MostRequestedAdmin';
import AssetTypeChart from './AssetTypeChart';
import TopUserActivity from './TopUserActivity';
import AssetApproval from './AssetApproval';


const HomeAdmin = () => {

    return (
        <div>
            <PendingRequestAll></PendingRequestAll>
            <MostRequestedAdmin></MostRequestedAdmin>
            <LimitedStockSection></LimitedStockSection>
            <AssetTypeChart></AssetTypeChart>
            <TopUserActivity></TopUserActivity>
            <AssetApproval></AssetApproval>
        </div>
    );
};

export default HomeAdmin;