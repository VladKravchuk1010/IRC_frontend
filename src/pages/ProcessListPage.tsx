import { type FC, useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap'
import { ProcessCard } from '../components/ProcessCard'
import { MOCK_PROCESSES } from '../api/mock'
import type { ChemicalProcess } from '../types'
import { BreadCrumbs } from '../components/BreadCrumbs'

export const ProcessListPage: FC = () => {
    const [processes, setProcesses] = useState<ChemicalProcess[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMock, setIsMock] = useState(false);

    // Состояния для фильтров
    const [search, setSearch] = useState('');
    const [minMass, setMinMass] = useState('');
    const [maxMass, setMaxMass] = useState('');

    // Функция загрузки данных (обернута в useCallback, чтобы не создаваться заново)
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setIsMock(false);

        try {
            // Собираем параметры запроса
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (minMass) params.append('min_mass', minMass);
            if (maxMass) params.append('max_mass', maxMass);

            const response = await fetch(`/api/chemical-processes/?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }

            const data = await response.json();
            setProcesses(data);
        } catch (err) {
            console.error("API недоступен:", err);
            setError("Сервер недоступен. Включен режим MOCK (фильтры не работают).");
            setIsMock(true);
            setProcesses(MOCK_PROCESSES);
        } finally {
            setLoading(false);
        }
    }, [search, minMass, maxMass]); // Запрос зависит от этих переменных

    // Вызываем загрузку при первом открытии
    useEffect(() => {
        fetchData();
    }, []); // Пустой массив - только при монтировании

    // Обработчик кнопки "Применить"
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <Container fluid className="mt-5">
            <BreadCrumbs crumbs={[{ label: 'Список услуг' }]} />
            <h2 className="mb-4">Каталог процессов {isMock ? '(MOCK)' : ''}</h2>

            {/* Панель фильтров */}
            <Form onSubmit={handleSearch} className="mb-4 p-3 bg-light rounded border">
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Control 
                            type="text" 
                            placeholder="Поиск по названию..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                            type="number" 
                            placeholder="Мин. масса" 
                            value={minMass}
                            onChange={(e) => setMinMass(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                            type="number" 
                            placeholder="Макс. масса" 
                            value={maxMass}
                            onChange={(e) => setMaxMass(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" type="submit" className="w-100">
                            Найти
                        </Button>
                    </Col>
                </Row>
            </Form>

            {loading && (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <Alert variant="warning">{error}</Alert>}

            <Row>
                {processes.length > 0 ? (
                    processes.map(process => (
                        <Col key={process.id} xs={12} md={6} lg={4} className="mb-4">
                            <ProcessCard process={process} />
                        </Col>
                    ))
                ) : (
                    !loading && <p className="text-center text-muted">Ничего не найдено</p>
                )}
            </Row>
        </Container>
    );
};