import {type FC, useEffect } from 'react';
import { Container, Table, Button, Form, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import {
    getDraft,
    updateDraft,
    deleteDraft,
    deleteProcessFromDraft,
    setDraftData
} from '../store/draftSlice';

export const DetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        id: calcId, target_mass, safety_factor, calculation_date,
        processes, loading, error, isDraft
    } = useSelector((state: RootState) => state.draft);

    useEffect(() => {
        if (id) {
            dispatch(getDraft(Number(id)));
        }
    }, [id, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setDraftData({ [name]: value }));
    };

    const handleSave = () => {
        if (calcId) {
            dispatch(updateDraft({
                appId: calcId,
                data: { target_mass, safety_factor, calculation_date }
            }));
        }
    };

    const handleDeleteAll = async () => {
        if (calcId && window.confirm("Очистить весь расчет?")) {
            await dispatch(deleteDraft(calcId));
            navigate('/processes');
        }
    };

    const handleDeleteProcess = (processId: number) => {
        if (calcId) {
            dispatch(deleteProcessFromDraft({ calculation_id: calcId, process_id: processId }));
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-4">
            <h2>Расчет №{id} {!isDraft && <span className="text-muted">(Архив)</span>}</h2>
            {error && <Alert variant="info">{error}</Alert>}

            <Row className="mb-4 mt-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Целевая масса</Form.Label>
                        <Form.Control
                            name="target_mass"
                            value={target_mass}
                            onChange={handleInputChange}
                            disabled={!isDraft}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Коэффициент запаса</Form.Label>
                        <Form.Control
                            name="safety_factor"
                            value={safety_factor}
                            onChange={handleInputChange}
                            disabled={!isDraft}
                        />
                    </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                    {isDraft && (
                        <>
                            <Button variant="success" className="me-2" onClick={handleSave}>Сохранить</Button>
                            <Button variant="danger" onClick={handleDeleteAll}>Очистить</Button>
                        </>
                    )}
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID Услуги</th>
                        <th>Количество</th>
                        {isDraft && <th>Действия</th>}
                    </tr>
                </thead>
                <tbody>
                    {processes.map((p) => (
                        <tr key={p.process}>
                            <td>{p.process}</td>
                            <td>{p.quantity}</td>
                            {isDraft && (
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProcess(p.process!)}>
                                        Удалить
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};