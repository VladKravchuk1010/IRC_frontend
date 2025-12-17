import { type FC, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { ProcessCard } from '../components/ProcessCard';


import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store'; 
import { setFilters, getProcessesList } from '../store/filterSlice'; 

const DEFAULT_FALLBACK_PATH = '/default.png';


export const ProcessListPage: FC = () => {
    
    const dispatch: AppDispatch = useDispatch(); 
    const {
        search,
        minMass,
        maxMass,
        processes,
        loading
    } = useSelector((state: RootState) => state.filter);
    
    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const safeNumber = (val: string): number | null => {
            if (val.trim() === '') return null;
            const num = Number(val);
            return isNaN(num) ? null : num;
        };

        dispatch(setFilters({
            search: name === 'search' ? value : search,
            minMass: name === 'minMass' ? safeNumber(value) : minMass,
            maxMass: name === 'maxMass' ? safeNumber(value) : maxMass,
            processes: processes,
            loading: loading
        }));
    }, [dispatch, search, minMass, maxMass, processes, loading]);

    useEffect(() => {
        dispatch(getProcessesList());
    }, [dispatch]);

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        dispatch(getProcessesList());
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Список химических процессов</h1>

            {/* Форма поиска теперь управляется Redux State */}
            <Form onSubmit={handleSearch} className="mb-5 p-4 border rounded shadow-sm">
                <Row className="g-3 align-items-end">

                    {/* Поле поиска по названию */}
                    <Col xs={12} md={4}>
                        <Form.Label>Поиск по названию</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Например, 'Аммиака'"
                            name="search"
                            value={search}
                            onChange={handleFilterChange}
                        />
                    </Col>

                    {/* Min Mass */}
                    <Col xs={6} md={3}>
                        <Form.Label>Минимальная масса (кг)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="От"
                            name="minMass"
                            value={minMass === null ? '' : minMass}
                            onChange={handleFilterChange}
                        />
                    </Col>

                    {/* Max Mass */}
                    <Col xs={6} md={3}>
                        <Form.Label>Максимальная масса (кг)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="До"
                            name="maxMass"
                            value={maxMass === null ? '' : maxMass}
                            onChange={handleFilterChange}
                        />
                    </Col>

                    {/* Кнопка поиска */}
                    <Col xs={12} md={2}>
                        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Найти'}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Рендеринг списка (как в методичке) */}
            {loading && processes.length === 0 ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {processes.length > 0 ? (
                        processes.map((process) => (
                            <Col key={process.id}>
                                <ProcessCard
                                    process={process}
                                    defaultImagePath={DEFAULT_FALLBACK_PATH}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <Alert variant="info">
                                К сожалению, пока ничего не найдено :(
                            </Alert>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};
