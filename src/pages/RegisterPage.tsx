import { type FC, useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { registerUserAsync, clearError } from '../store/userSlice';

const RegisterPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);
        dispatch(clearError());

        if (formData.password !== formData.password_confirm) {
            setValidationError("Пароли не совпадают!");
            return;
        }

        if (formData.password.length < 6) {
            setValidationError("Пароль должен быть не менее 6 символов.");
            return;
        }

        try {
            await dispatch(registerUserAsync(formData)).unwrap();

            navigate('/login');
        } catch (err) {
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow-lg border-0 bg-element p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Body>
                    <h2 className="text-white text-center fw-bold mb-4">Регистрация</h2>

                    {(error || validationError) && (
                        <Alert variant="danger">
                            {validationError || error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white-50">Логин</Form.Label>
                                    <Form.Control
                                        name="username"
                                        required
                                        onChange={handleChange}
                                        placeholder="ivan_petrov"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white-50">Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        required
                                        onChange={handleChange}
                                        placeholder="example@mail.ru"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white-50">Имя</Form.Label>
                                    <Form.Control
                                        name="first_name"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white-50">Фамилия</Form.Label>
                                    <Form.Control
                                        name="last_name"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <hr className="bg-secondary my-4" />

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white-50">Пароль</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        required
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-white-50">Подтверждение</Form.Label>
                                    <Form.Control
                                        name="password_confirm"
                                        type="password"
                                        required
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Создать аккаунт
                            </Button>
                        </div>
                    </Form>

                    <div className="text-center mt-4">
                        <span className="text-white-50">Уже есть аккаунт? </span>
                        <Link to="/login" className="text-accent-yellow text-decoration-none">
                            Войти
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterPage;