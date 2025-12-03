import { type FC, useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { MOCK_PROCESSES } from '../api/mock';
import { ProcessCard } from '../components/ProcessCard';


// --- Redux Toolkit Imports ---
import { useSelector, useDispatch } from 'react-redux';
// Исправлено: RootState и AppDispatch импортируются напрямую из store
import type { RootState, AppDispatch } from '../store/store'; 
import { setFilters } from '../store/filterSlice'; 

// --- Импорт общих типов ---
import type { ChemicalProcess, FilterState } from '../types'; 
// -----------------------------

const API_BASE_URL = 'http://172.20.10.3:8000'; 
const DEFAULT_FALLBACK_PATH = '/default.png';


export const ProcessListPage: FC = () => {
    
    // --- Использование Redux ---
    // Исправлено: Явно указываем AppDispatch
    const dispatch: AppDispatch = useDispatch(); 
    // Исправлено: Явно указываем тип RootState в useSelector
    const { search, minMass, maxMass } = useSelector((state: RootState) => state.filter);
    
    // --- Локальные состояния с явной типизацией ---
    const [processes, setProcesses] = useState<ChemicalProcess[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isMock, setIsMock] = useState<boolean>(false);


    // --- Функция для получения данных ---
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setIsMock(false);

        const params = new URLSearchParams();
        if (search) params.append('search', search);
        // Обработка пустой строки, чтобы не отправлять 'min_mass='
        if (minMass) params.append('min_mass', String(parseFloat(minMass))); 
        if (maxMass) params.append('max_mass', String(parseFloat(maxMass)));

        const url = `/api/chemical-processes/${'?' + params.toString()}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            // Явно указываем тип данных
            setProcesses((data.results || data) as ChemicalProcess[]); 
        } catch (e) {
            console.error("Ошибка при получении данных:", e);
            setError("Не удалось получить данные с сервера. Использование Mock-объектов.");
            setIsMock(true);
            
            // ИСПРАВЛЕНО: MOCK Fallback с полным набором полей по интерфейсу ChemicalProcess
            setProcesses(MOCK_PROCESSES);
        } finally {
            setLoading(false);
        }
    }, [search, minMass, maxMass]); 


    useEffect(() => {
        fetchData(); 
    }, [fetchData]); 


    // --- Обработчик изменения полей (обновляет Redux-состояние) ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        let newState: FilterState = { search, minMass, maxMass};
        
        if (name == 'search') {
            newState.search = value;
        }

        if (name === 'minMass') {
            newState.minMass = value;
        }

        if (name === 'maxMass') {
            newState.maxMass = value;
        }
        
        dispatch(setFilters(newState));
    };


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData(); 
    };

    return (
        <Container fluid className="mt-4">
            <h1>Химические процессы</h1>
            {isMock && <Alert variant="warning">Приложение работает в режиме Mock-объектов.</Alert>}
            {error && !isMock && <Alert variant="danger">{error}</Alert>}

            {/* Форма фильтрации */}
            <Form onSubmit={handleSearch} className="mb-4 p-3 border rounded shadow-sm bg-light">
                <Row className="g-3 align-items-end">
                    
                    <Col xs={12} md={5}>
                        <Form.Label>Поиск по названию</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="search"
                            placeholder="Название или описание..."
                            value={search} 
                            onChange={handleInputChange} 
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <Form.Label>Мин. масса</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="minMass"
                            placeholder="Минимальная масса"
                            value={minMass} 
                            onChange={handleInputChange}
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <Form.Label>Макс. масса</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="maxMass"
                            placeholder="Максимальная масса"
                            value={maxMass} 
                            onChange={handleInputChange}
                        />
                    </Col>
                    
                    <Col xs={12} md={1}>
                        <Button type="submit" variant="primary" className="w-100">
                            Найти
                        </Button>
                    </Col>
                </Row>
            </Form>
            
            {loading ? (
                <div className="text-center mt-5"><Spinner animation="border" role="status" /></div>
            ) : (
                <>
                    {/* АДАПТИВНАЯ СЕТКА КАРТОЧЕК */}
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4"> 
                        {processes.length > 0 ? (
                            processes.map((process) => (
                                <Col key={process.id}> 
                                    <ProcessCard 
                                        process={process}
                                        apiBaseUrl={API_BASE_URL}
                                        defaultImagePath={DEFAULT_FALLBACK_PATH}
                                    />
                                </Col>
                            ))
                        ) : (
                            <Col xs={12}>
                                <Alert variant="info">Услуги не найдены.</Alert>
                            </Col>
                        )}
                    </Row>
                </>
            )}
        </Container>
    );
};
