import { useEffect, useState, type FC, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Alert, Card, Container } from 'react-bootstrap';
import type { RootState, AppDispatch } from '../store/store';
import { loginUserAsync } from '../store/userSlice';
import type { UserLogin } from '../api/Api';

const LoginPage: FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const { error } = useSelector((state: RootState) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<UserLogin>({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/processes', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(loginUserAsync(formData));
    };

    if (isAuthenticated) {
        return null;
    }

    return (
        <Container style={{ paddingTop: '100px', maxWidth: '400px' }}>
            <Card className="shadow-lg p-4">
                <h2 className="text-center mb-4">Вход в систему</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
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

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Войти
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <span className="text-white-50">Впервые у нас? </span>
                    <Link to="/register" className="text-accent-yellow text-decoration-none">
                        Создать аккаунт
                    </Link>
                </div>
            </Card>
        </Container>
    );
};

export default LoginPage;