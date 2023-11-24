import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Container from '../Components/Container';
import Footer from '../Components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Container>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            </Container>
            
        </div>
    );
};

export default MainLayout;