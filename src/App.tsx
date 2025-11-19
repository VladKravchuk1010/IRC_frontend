import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { HomePage } from './pages/HomePage';
import { ProcessListPage } from './pages/ProcessListPage';
import { ProcessDetailPage } from './pages/ProcessDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/">IRC Lab</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
              <Nav.Link href="/">Главная</Nav.Link>
              <Nav.Link href="/processes">Список услуг</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/processes" element={<ProcessListPage />} />
        <Route path="/processes/:id" element={<ProcessDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;