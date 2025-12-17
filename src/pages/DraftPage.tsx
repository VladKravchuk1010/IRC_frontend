import { type FC, useEffect, useState } from 'react';
import { Col, Row, Alert, Spinner, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getDraft, updateDraft, deleteDraft, resetDraft } from '../store/draftSlice';
import { ProcessCardInDraft } from '../components/ProcessCardInDraft';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { fetchCarticonAsync } from '../store/cartSlice';

// Если finalizeDraft еще не создан в слайсе, создай его там. 
// Здесь импортируем для использования:
// import { finalizeDraft } from '../store/draftSlice';

const DraftPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        processes,
        target_mass,
        safety_factor,
        calculation_date,
        error,
        loading,
        count,
    } = useSelector((state: RootState) => state.draft);

    useEffect(() => {
            dispatch(fetchCarticonAsync());
        }, [dispatch]);
            
    const draftId = useSelector((state: RootState) => state.cart.calculation_id);

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    // Локальное состояние для редактирования параметров
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        target_mass: '',
        safety_factor: ''
    });

    // Синхронизация локальной формы с данными из Redux
    useEffect(() => {
        setEditForm({
            target_mass: target_mass || '',
            safety_factor: safety_factor || ''
        });
    }, [target_mass, safety_factor]);

    useEffect(() => {
        if (draftId && processes.length === 0 && !loading) {
            dispatch(getDraft(draftId));
        }
    }, [dispatch, draftId]);

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    const handleCardClick = (processId: number | undefined) => {
        if (processId) {
            navigate(`/processes/${processId}`);
        }
    };

    const handleSaveParams = async () => {
        if (draftId) {
            await dispatch(updateDraft({
                appId: draftId,
                data: {
                    target_mass: editForm.target_mass,
                    safety_factor: editForm.safety_factor,
                    calculation_date: calculation_date // сохраняем текущую дату
                } as any
            }));
            setIsEditing(false);
        }
    };

    const handleFinalize = async () => {
        if (!draftId) return;

        if (window.confirm("Вы уверены, что хотите сформировать заявку? После этого редактирование будет невозможно.")) {
            // Предполагаем, что экшен finalizeDraft реализован в слайсе
            // await dispatch(finalizeDraft(draftId));

            // После формирования обычно перенаправляют на список всех заявок
            alert("Заявка успешно сформирована!");
            dispatch(resetDraft());
            navigate('/calculations');
        }
    };

    const handleDelete = async () => {
        if (draftId && window.confirm("Удалить этот черновик?")) {
            await dispatch(deleteDraft(draftId));
            navigate('/processes');
        }
    };

    if (loading && processes.length === 0) {
        return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
    }

    return (
        <Container className="mt-5 pb-5">
            <BreadCrumbs crumbs={[{ label: 'Расчеты', path: '/calculations' }, { label: `Черновик №${draftId || '...'}` }]} />

            <div className="calculation-content">
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Row className="mb-4 align-items-center">
                    <Col>
                        <h1 className="display-5 text-primary">Черновик Расчета №{draftId || '...'}</h1>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-danger" onClick={handleDelete}>
                            Удалить черновик
                        </Button>
                    </Col>
                </Row>

                <Card className="p-4 mb-4 shadow-sm border-0 bg-light">
                    <div className="d-flex justify-content-between align-items-start">
                        <h3>Параметры Расчета</h3>
                        {!isEditing && (
                            <Button variant="link" onClick={() => setIsEditing(true)}>Изменить</Button>
                        )}
                    </div>

                    {isEditing ? (
                        <Form className="mt-3">
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Целевая масса (кг)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editForm.target_mass}
                                            onChange={(e) => setEditForm({ ...editForm, target_mass: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Коэффициент безопасности</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editForm.safety_factor}
                                            onChange={(e) => setEditForm({ ...editForm, safety_factor: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" className="me-2" onClick={handleSaveParams}>Сохранить</Button>
                            <Button variant="secondary" onClick={() => setIsEditing(false)}>Отмена</Button>
                        </Form>
                    ) : (
                        <div className="mt-2">
                            <p className="mb-1"><strong>Целевая масса:</strong> {target_mass} кг</p>
                            <p className="mb-1"><strong>Коэффициент безопасности:</strong> {safety_factor || 'не указан'}</p>
                            <p className="mb-0 text-muted"><strong>Дата создания:</strong> {calculation_date}</p>
                        </div>
                    )}
                </Card>

                <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                    <h2>Выбранные услуги <span className="text-muted">({count})</span></h2>
                    <Button
                        variant="success"
                        size="lg"
                        disabled={processes.length === 0}
                        onClick={handleFinalize}
                        className="px-4 shadow"
                    >
                        🚀 Сформировать заявку
                    </Button>
                </div>

                <div className="cards-wrapper-2 d-flex flex-column gap-3">
                    {processes.length ? (
                        processes.map((item) => (
                            <ProcessCardInDraft
                                key={item.id || item.process}
                                processId={item.process}
                                url={item.process_image}
                                processName={item.process_name}
                                imageClickHandler={() => handleCardClick(item.process)}
                                count={item.quantity}
                                result={item.calculation_result}
                                itemId={item.id}
                            />
                        ))
                    ) : (
                        <Alert variant="info" className="text-center py-5">
                            <h4>Ваша корзина пуста</h4>
                            <p>Добавьте услуги из каталога, чтобы произвести расчет.</p>
                            <Button variant="primary" onClick={() => navigate('/processes')}>Перейти к списку услуг</Button>
                        </Alert>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default DraftPage;