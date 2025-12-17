import { useState, useEffect, type FC } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, BrowserRouter} from 'react-router-dom'; 
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap'; 

import { HomePage } from './pages/HomePage';
import { ProcessListPage } from './pages/ProcessListPage';
import { ProcessDetailPage } from './pages/ProcessDetailPage';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, type AppDispatch, type RootState } from './store/store';
import LoginPage from './pages/LoginPage';
import { logoutUserAsync, fetchUserOnStartup } from './store/userSlice';
import { getProcessesList, setFilters } from './store/filterSlice';
import RegisterPage from './pages/RegisterPage';
import { api } from './api';
import { fetchCarticonAsync } from './store/cartSlice';
import { ProfilePage } from './pages/ProfilePage';
import DraftPage from './pages/DraftPage';
import { getDraft, resetDraft } from './store/draftSlice';
import { ListPage } from './pages/ListPage';


function AppContent() {
    const location = useLocation();
    const isHomePage = location.pathname === '/'; 
    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, username } = useSelector((state: RootState) => state.user);
    // const { search, minMass, maxMass } = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        if (!isHomePage) { 
            dispatch(fetchCarticonAsync());
        }

    }, [isHomePage, dispatch]);

    const cartCount = useSelector((state: RootState) => state.cart.count);
    const draftId = useSelector((state: RootState) => state.cart.calculation_id);
    
    const handleLogout = async () => {
        await dispatch(logoutUserAsync());
        localStorage.removeItem('session-key')
        dispatch(resetDraft());

        dispatch(setFilters({
            search: '',
            minMass: 0,
            maxMass: 0,
            processes: [],
            loading: false
        }));

        navigate('/processes');

        dispatch(getProcessesList());
    };
    
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-0 shadow-sm">
                <Container fluid> 
                    <Navbar.Brand as={Link} to="/">IRC Lab</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link as={Link} to="/processes">Список услуг</Nav.Link>
                            {isAuthenticated && (
                                <Nav.Link as={Link} to="/calculations">Мои заявки</Nav.Link>
                            )}
                        </Nav>

                        {isAuthenticated && (
                            <Navbar.Text className="text-white me-3">
                                <span className="fw-bold me-1">Добро пожаловать,</span>
                                <Link to="/profile" className="text-info text-decoration-none">
                                    {username}
                                </Link>
                            </Navbar.Text>
                        )}

                        {!isHomePage && (
                            <Link
                                to={draftId ? "/cart" : "#"}
                                className={`btn d-flex align-items-center me-3 ${draftId
                                        ? 'btn-outline-light'
                                        : 'btn-outline-secondary disabled'
                                    }`}
                                onClick={(e) => {
                                    if (!draftId) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <span style={{ fontSize: '1.2rem', marginRight: '5px' }}>🛒</span>
                                <span>Заявка</span>

                                {cartCount > 0 && (
                                    <Badge bg="danger" className="ms-1">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Link>
                        )}

                        {!isAuthenticated ? (
                            <Link to="/login" className="btn btn-success">
                                Войти
                            </Link>
                        ) : (
                            <Button variant="outline-danger" onClick={handleLogout}>
                                Выйти
                            </Button>
                        )}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
              <Route path="/" element={<HomePage />} />
                <Route path="/processes" element={<ProcessListPage />} />
                <Route path="/processes/:id" element={<ProcessDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<DraftPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/calculations" element={<ListPage />} />
            </Routes>
        </>
    );
}

const App: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        localStorage.removeItem('session-key')
        dispatch(resetDraft());    
    }, [dispatch])
    
    dispatch(logoutUserAsync());

    dispatch(setFilters({
        search: '',
        minMass: 0,
        maxMass: 0,
        processes: [],
        loading: false
    }));
    
    return (
        <BrowserRouter>
            <AppContent /> 
        </BrowserRouter>
    );
} 

export default App;