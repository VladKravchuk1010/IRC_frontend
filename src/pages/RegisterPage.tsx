import { type FC, useState, type ChangeEvent, type FormEvent } from 'react';
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUserAsync } from '../store/userSlice';
import type { AppDispatch, RootState } from '../store/store';
import { Link } from 'react-router-dom';
import type { UserRegistration } from '../api/Api';

const RegisterPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
    });

    // Используем состояние для ошибки/успеха
    const error = useSelector((state: RootState) => state.user.error);
    const loading = false; // Можно добавить состояние загрузки в userSlice

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.passwordConfirm) {
            alert('Пароли не совпадают!');
            return;
        }

        const registrationData = {
            username: formData.username,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            password: formData.password,
            password_confirm: formData.passwordConfirm
            
        };

        const resultAction = await dispatch(registerUserAsync(registrationData));

        if (registerUserAsync.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    return (
        <Container style={{ maxWidth: '450px', marginTop: '100px' }}>
            <h2 className="text-center mb-4">Регистрация нового пользователя</h2>

            {error && <Alert variant={error.includes('успешно') ? 'success' : 'danger'}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Придумайте имя пользователя"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите Email"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="firstName" className="mb-4">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Имя"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName" className="mb-4">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Фамилия"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="passwordConfirm" className="mb-4">
                    <Form.Label>Подтверждение пароля</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                        required
                    />
                </Form.Group>

                <Button
                    variant="success"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                >
                    {loading ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                        'Зарегистрироваться'
                    )}
                </Button>
            </Form>

            <p className="mt-3 text-center">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </Container>
    );
};

export default RegisterPage;