import { type FC, useEffect, useState, useRef } from 'react';
import { Container, Table, Button, Spinner, Form, Badge, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { fetchCalculations, moderateCalculation } from '../store/listSlice';
import { api } from '../api';

export const CalculationsListPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.list);
    const user = useSelector((state: RootState) => state.user);

    const [status, setStatus] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');

    useEffect(() => {
        let active = true;
        let timerId: ReturnType<typeof setTimeout>;

        const tick = async () => {
            try {
                await dispatch(fetchCalculations({
                    status: status || undefined,
                    date_from: dateFrom || undefined,
                    date_to: dateTo || undefined
                })).unwrap();
            } finally {
                if (active) {
                    timerId = setTimeout(tick, 5000);
                }
            }
        };

        tick();

        return () => {
            active = false;
            clearTimeout(timerId);
        };
    }, [dispatch, status, dateFrom, dateTo]);

    const handleAction = async (id: number, action: 'complete' | 'reject') => {
        try {
            await dispatch(moderateCalculation({ id, action })).unwrap();
        } catch (err) {
            alert(err);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'DRAFT': return <Badge bg="warning" className="text-dark">Черновик</Badge>;
            case 'FORMED': return <Badge bg="info">Сформирована</Badge>;
            case 'COMPLETED': return <Badge bg="success">Завершена</Badge>;
            case 'REJECTED': return <Badge bg="danger">Отклонена</Badge>;
            case 'DELETED': return <Badge bg="secondary">Удалена</Badge>;
            default: return <Badge bg="light" className="text-dark">Неизвестно</Badge>;
        }
    };

    const filteredItems = items.filter(item => {
        const author = item.client_username || "";
        console.log(item)
        return author.toLowerCase().includes(authorFilter.toLowerCase());
    });

    return (
        <Container className="mt-5 text-white">
            <h2 className="fw-bold mb-4 display-6">Реестр расчетов</h2>

            <Card className="bg-dark border-secondary mb-4 p-3 shadow-sm text-white">
                <Row className="g-3 align-items-end">
                    <Col md={2}>
                        <Form.Label className="text-white-50 small">Статус</Form.Label>
                        <Form.Select size="sm" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-dark text-white border-secondary">
                            <option value="">Все</option>
                            <option value="DRAFT">Черновик</option>
                            <option value="FORMED">Сформирован</option>
                            <option value="COMPLETED">Завершен</option>
                            <option value="REJECTED">Отклонен</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Label className="text-white-50 small">Дата от</Form.Label>
                        <Form.Control type="date" size="sm" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-dark text-white border-secondary" />
                    </Col>
                    {/* Добавил поле Дата до */}
                    <Col md={2}>
                        <Form.Label className="text-white-50 small">Дата до</Form.Label>
                        <Form.Control type="date" size="sm" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-dark text-white border-secondary" />
                    </Col>
                    <Col md={3}>
                        <Form.Label className="text-white-50 small">Поиск автора</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Имя создателя..." value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className="bg-dark text-white border-secondary" />
                    </Col>
                    <Col md={3}>
                        <Button variant="outline-warning" size="sm" className="w-100" onClick={() => { setStatus(''); setDateFrom(''); setDateTo(''); setAuthorFilter(''); }}>
                            Сбросить фильтры
                        </Button>
                    </Col>
                </Row>
            </Card>

            <div className="table-responsive shadow">
                {loading && items.length === 0 ? (
                    <div className="text-center p-5"><Spinner animation="border" variant="warning" /></div>
                ) : (
                    <Table hover variant="dark" className="align-middle mb-0">
                        <thead className="table-light-header">
                            <tr>
                                <th className="ps-4">№ Заявки</th>
                                <th>Дата</th>
                                <th>Масса (кг)</th>
                                <th>Статус</th>
                                <th>Позиций</th>
                                <th className="text-end pe-4">Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="table-row-hover">
                                    <td className="ps-4 fw-bold text-accent-yellow">#{item.id}</td>
                                    <td>{new Date(item.calculation_date).toLocaleDateString('ru-RU')}</td>
                                    <td>{item.target_mass}</td>
                                    <td>{getStatusBadge(item.status)}</td>
                                    <td className="text-info fw-bold">{item.results_quantity || 0}</td>
                                    <td className="text-end pe-4">
                                        {/* Проверь, что в userSlice поле называется именно is_staff */}
                                        {user?.is_staff && item.status === 'FORMED' && (
                                            <>
                                                <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleAction(item.id, 'complete')}>✅</Button>
                                                <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleAction(item.id, 'reject')}>❌</Button>
                                            </>
                                        )}
                                        <Link to={`/calculations/${item.id}`} className="btn btn-sm btn-info rounded-pill px-3">
                                            🔍 Детали
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </Container>
    );
};