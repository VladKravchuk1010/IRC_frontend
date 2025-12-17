import { type FC, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { fetchCalculations } from '../store/listSlice';

export const ListPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.list);

    useEffect(() => {
        dispatch(fetchCalculations());
    }, [dispatch]);

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-4">
            <h3>Мои расчеты (Заявки)</h3>
            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата создания</th>
                        <th>Целевая масса</th>
                        <th>Статус</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.calculation_date}</td>
                            <td>{item.target_mass}</td>
                            <td>{item.status === 1 ? 'Черновик' : 'Завершено'}</td>
                            <td>
                                <Link to={`/calculations/${item.id}`} className="btn btn-sm btn-primary">
                                    Открыть
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};