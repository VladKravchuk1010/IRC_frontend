import { type FC, useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert, Form, Badge, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { fetchCalculations } from '../store/listSlice';

export const ListPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.list);

    const today = new Date().toISOString().split('T')[0];
    const [status, setStatus] = useState('');
    const [dateFrom, setDateFrom] = useState(today);
    const [dateTo, setDateTo] = useState('');
    
    const loadData = () => {
        dispatch(fetchCalculations({
            status: status || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined
        }));
    };

    const getStatusBadge = (status: string) => {
        
        switch (status) {
            case 'DRAFT':
                return <Badge bg="warning" className="text-dark">Черновик</Badge>;
            case 'FORMED':
                return <Badge bg="info">Сформирована</Badge>;
            case 'COMPLETED':
                return <Badge bg="success">Завершена</Badge>;
            case 'REJECTED':
                return <Badge bg="danger">Отклонена</Badge>;
            case 'DELETED':
                return <Badge bg="secondary">Удалена</Badge>;
            default:
                return <Badge bg="light" className="text-dark">Неизвестно</Badge>;
        }
    };

    useEffect(() => {
        loadData();
    }, [status, dateFrom, dateTo]);

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('ru-RU');
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-5">
            <h2 className="text-white fw-bold mb-4 display-6">История ваших расчетов</h2>

            <Card className="bg-dark border-secondary mb-4 p-3 shadow-sm">
                <Row className="g-2 align-items-end">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-white-50 small">Статус расчета</Form.Label>
                            <Form.Select
                                size="sm"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-dark text-white border-secondary"
                            >
                                <option value="">Все статусы</option>
                                <option value="DRAFT">Черновик</option>
                                <option value="FORMED">Сформирован</option>
                                <option value="COMPLETED">Завершен</option>
                                <option value="REJECTED">Отклонен</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-white-50 small">Дата от</Form.Label>
                            <Form.Control
                                type="date"
                                size="sm"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="bg-dark text-white border-secondary"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="text-white-50 small">Дата до</Form.Label>
                            <Form.Control
                                type="date"
                                size="sm"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="bg-dark text-white border-secondary"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            className="w-100"
                            onClick={() => { setStatus(''); setDateFrom(''); setDateTo(''); }}
                        >
                            Сбросить фильтры
                        </Button>
                    </Col>
                </Row>
            </Card>

            <div className="table-responsive custom-table-container">
                <Table hover variant="dark" className="align-middle">
                    <thead className="table-light-header">
                        <tr>
                            <th className="ps-4">№ Заявки</th>
                            <th>Дата создания</th>
                            <th>Целевая масса</th>
                            <th>Статус</th>
                            <th>Результаты (кол-во)</th>
                            <th className="text-end pe-4">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="table-row-hover">
                                <td className="ps-4 fw-bold text-accent-yellow">#{item.id}</td>
                                <td>{formatDate(item.calculation_date)}</td>
                                <td>{item.target_mass} кг</td>
                                <td>{getStatusBadge(item.status)}</td>
                                <td className="text-info fw-bold">
                                    {item.results_quantity || 0}
                                </td>
                                <td className="text-end pe-4">
                                    <Link to={`/calculations/${item.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                        Детали
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};