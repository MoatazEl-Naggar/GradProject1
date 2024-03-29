import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.css';

// Pages
import Login from './Components/login/login';
import SideBar from './Components/sidebar/sidebar';
import Home from './pages/home';
import Doners from './pages/doners';
import Requests from './pages/requests';
import AddDoners from './pages/add_doners';
import AddRequests from './pages/add_requests';
import BloodStock from './pages/bloodstock';
import PlaceAnalysis from './pages/place_analysis';
import DonerFile from './Components/tables/doner_profile';
import RequestFile from './Components/tables/request_file';
import Approval from './pages/approval';
import AddBank from './pages/addBank';
import NewBank from './pages/newBank';
import UserPrediction from './pages/userPrediction';
import SingleBloodStock from "./pages/singleBankStock";

const MainContent = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && (
                <SideBar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/doners" element={<Doners />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/add_doners" element={<AddDoners />} />
                        <Route path="/add_requests" element={<AddRequests />} />
                        <Route path="/bloodstock" element={<BloodStock />} />
                        <Route path="/place_analysis" element={<PlaceAnalysis />} />
                        <Route path="/doner_profile" element={<DonerFile />} />
                        <Route path="/request_file" element={<RequestFile />} />
                        <Route path="/approval" element={<Approval />} />
                        <Route path="/addBank" element={<AddBank />} />
                        <Route path="/newBank" element={<NewBank />} />
                        <Route path="/userPrediction" element={<UserPrediction />} />
                        <Route path="/singleBloodStock" element={<SingleBloodStock />} />
                    </Routes>
                </SideBar>
            )}
        </div>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

const AppContent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && location.pathname !== '/login') {
            navigate('/login'); // Redirect to login if token has expired
        }
    }, [location, navigate]);

    return (
        <div className={styles.App}>
            <header>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<MainContent />} />
                </Routes>
            </header>
        </div>
    );
};

export default App;
