import { type FC, useEffect, useState } from 'react';
import { Col, Row, Alert, Spinner, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { updateReagentCalculation, deleteEntireDraft, formReagentCalculation, setDraftData, deleteProcessFromCalculation, getDraft, updateProcessQuantityAsync } from '../store/draftSlice';
import { ProcessCardInDraft } from '../components/ProcessCardInDraft';
import { fetchActiveCalculationStatus } from '../store/cartSlice';

const DraftPage: FC = () => {
    const { id: urlId } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const idFromCart = useSelector((state: RootState) => state.cart.calculation_id);
    const effectiveId = urlId ? Number(urlId) : idFromCart;

    useEffect(() => {
        if (effectiveId) {
            dispatch(getDraft(effectiveId));
        }
    }, [dispatch, effectiveId]);

    const {
        id,
        processes,
        target_mass,
        safety_factor,
        loading,
        calculation_date,
        isDraft
    } = useSelector((state: RootState) => state.draft);

    // const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const handleformReagentCalculation = async () => {
        
        const isTargetMassValid = target_mass && Number(target_mass) > 0;
        const isSafetyFactorValid = safety_factor && Number(safety_factor) > 0;

        if (!isTargetMassValid || !isSafetyFactorValid) {
            alert("Пожалуйста, заполните 'Целевую массу' и 'Коэффициент запаса' перед формированием заявки.");
            return;
        }
        
        if (id) {
            await dispatch(formReagentCalculation(id));
            await dispatch(fetchActiveCalculationStatus());
            navigate('/processes');
        }
    };

    const handleSave = async () => {
        if (id) {
            await dispatch(updateReagentCalculation({
                appId: id,
                data: { target_mass, safety_factor, calculation_date }
            }));
            setIsEditing(false);
        }
    };

    const handleDeleteEntireDraft = async () => {
        if (id && window.confirm("Вы уверены, что хотите полностью удалить этот расчет?")) {
            await dispatch(deleteEntireDraft(id));
            await dispatch(fetchActiveCalculationStatus());
            navigate('/processes');
        }
    };

    const handleRemoveProcess = (procId: number) => {
        if (id) {
            dispatch(deleteProcessFromCalculation({ calculation_id: id, process_id: procId }));
        }
    };

    const handleQuantityChange = (procId: number, newQty: number) => {
        if (!id) return;

        const validatedQty = newQty < 1 ? 1 : newQty;

        dispatch(updateProcessQuantityAsync({
            calculationId: id,
            processId: procId,
            quantity: validatedQty,
            calculation_result: "0.00" 
        }));
    };

    if (loading && !id) {
        return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
    }
    
    if (!id) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="info" className="py-5 shadow-sm">
                    <h4>Заявка не найдена</h4>
                    <p>Ваша корзина пуста или заявка уже была сформирована.</p>
                    <Button variant="primary" onClick={() => navigate('/processes')}>Перейти в каталог</Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 className="text-white fw-extrabold display-5">
                    {isDraft ? 'Черновик расчета' : 'Детали расчета'}
                    <span className="text-accent-purple ms-2">№{id}</span>
                </h2>
                <div className="d-flex gap-2">
                    {isDraft && (
                        <>
                            <Button
                                variant="success"
                                onClick={handleformReagentCalculation}
                                className="shadow-sm"
                            >
                                🚀 Сформировать
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                className="shadow-sm"
                            >
                                💾 Сохранить
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDeleteEntireDraft}
                                className="shadow-sm"
                            >
                                🗑️ Удалить заявку
                            </Button>
                        </>
                    )}
                    {!isDraft && (
                        <Button variant="outline-secondary" onClick={() => navigate('/reagent_calculations')}>
                            ← К списку
                        </Button>
                    )}
                </div>
            </div>

            {loading && <div className="text-center my-4"><Spinner animation="border" /></div>}

            <Card className="mb-4 bg-light border-0 shadow-sm">
                <Card.Body>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Целевая масса (кг)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={target_mass}
                                    disabled={!isDraft}
                                    onChange={(e) => dispatch(setDraftData({ target_mass: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Коэффициент запаса</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={safety_factor}
                                    disabled={!isDraft}
                                    onChange={(e) => dispatch(setDraftData({ safety_factor: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <div className="cards-wrapper mb-5">
                {processes.map((item) => (
                    <ProcessCardInDraft
                        key={item.process}
                        processId={item.process}
                        url={item.process_image}
                        processName={item.process_name}
                        count={item.quantity}
                        result={item.calculation_result}
                        isDraft={isDraft}
                        onRemove={handleRemoveProcess}
                        onQuantityChange={handleQuantityChange}
                        imageClickHandler={() => navigate(`/processes/${item.process}`)}
                    />
                ))}
            </div>
        </Container>
    );
};

export default DraftPage;