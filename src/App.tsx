import { useState, useEffect, type FC } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { HomePage } from './pages/HomePage';
import { ProcessListPage } from './pages/ProcessListPage';
import { ProcessDetailPage } from './pages/ProcessDetailPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { dest_api } from "./target_config"


const fetchCartCount = async (setCartCount: (count: number) => void) => {
    try {
        const response = await fetch(dest_api + '/api/reagent_calculations/cart-icon/');

        if (response.ok) {
            const data = await response.json();
            setCartCount(data.count || 0);
        } else {
            setCartCount(0);
        }
    } catch (error) {
        setCartCount(0);
    }
};


function AppContent() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [cartCount, setCartCount] = useState<number | null>(null);

    useEffect(() => {
        if (!isHomePage) {
            fetchCartCount(setCartCount);
        }
    }, [isHomePage]);

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
                        </Nav>

                        {!isHomePage && (
                            <Link
                                to="#"
                                className="nav-link d-flex align-items-center ms-auto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Корзина пока недоступна: требуется авторизация!");
                                }}
                            >
                                <span style={{ fontSize: '1.2rem', marginRight: '5px' }}>🛒</span>
                                <span className="text-white">Корзина</span>

                                {cartCount !== null && (
                                    <Badge
                                        bg={cartCount > 0 ? "danger" : "secondary"}
                                        className="ms-1"
                                    >
                                        {cartCount}
                                    </Badge>
                                )}
                            </Link>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/processes" element={<ProcessListPage />} />
                <Route path="/processes/:id" element={<ProcessDetailPage />} />
            </Routes>
        </>
    );
}

const App: FC = () => (
    <Provider store={store}>
        <AppContent />
    </Provider>
);

export default App;