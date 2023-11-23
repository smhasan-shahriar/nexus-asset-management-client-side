import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Container from '../Components/Container';

const MainLayout = () => {
    return (
        <div>
            <Container>
            <Navbar></Navbar>
            <Outlet></Outlet>
            </Container>
            
        </div>
    );
};

export default MainLayout;