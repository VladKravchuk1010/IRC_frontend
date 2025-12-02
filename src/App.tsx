// src/App.tsx

import { useState, useEffect, type FC } from 'react';
// Импортируем useLocation для проверки текущего пути
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'; 
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'; 

// !!! ВАЖНО: Убедитесь, что ваши файлы страниц импортированы правильно !!!
import { HomePage } from './pages/HomePage';
import { ProcessListPage } from './pages/ProcessListPage';
import { ProcessDetailPage } from './pages/ProcessDetailPage';
// ---------------------------------------------------------------------


// --- Логика запроса корзины (для повторного использования) ---
const fetchCartCount = async (setCartCount: (count: number) => void) => {
    try {
        // Эндпоинт, который мы нашли в api_urls.py
        const response = await fetch('/api/reagent_calculations/cart-icon/'); 
        
        if (response.ok) {
            const data = await response.json();
            // Устанавливаем счетчик (0, если нет)
            setCartCount(data.count || 0); 
        } else {
            // Если сервер вернул ошибку (напр., без авторизации)
            setCartCount(0); 
        }
    } catch (error) {
        // Ошибка сети или MOCK-режим
        setCartCount(0); 
    }
};


// --- Компонент, который содержит Navbar и Routes (для использования useLocation) ---
function AppContent() {
    // 1. Проверяем текущий путь
    const location = useLocation();
    const isHomePage = location.pathname === '/'; 
    
    // Состояние для счетчика
    const [cartCount, setCartCount] = useState<number | null>(null);

    // Эффект для загрузки данных счетчика
    useEffect(() => {
        // Запрос выполняется только если мы НЕ на главной странице
        if (!isHomePage) { 
            fetchCartCount(setCartCount);
        }
        // Хук перезапустится при смене страницы (isHomePage)
    }, [isHomePage]); 
    
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-0 shadow-sm">
                <Container fluid> 
                    {/* Используем 'as={Link} to' для корректной работы router */}
                    <Navbar.Brand as={Link} to="/">IRC Lab</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        
                        {/* Основные ссылки */}
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                            <Nav.Link as={Link} to="/processes">Список услуг</Nav.Link>
                        </Nav>

                        {/* 2. УСЛОВНЫЙ РЕНДЕРИНГ: Показываем, только если НЕ на главной странице */}
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

            {/* Основные маршруты */}
            <Routes>
              <Route path="/" element={<HomePage />} />
                <Route path="/processes" element={<ProcessListPage />} />
                <Route path="/processes/:id" element={<ProcessDetailPage />} />
            </Routes>
        </>
    );
}

// --- Корневой компонент для обертывания в BrowserRouter ---
// Это стандартный паттерн для работы с useLocation.
const App: FC = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;