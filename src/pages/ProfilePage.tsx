import { type FC, useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { updateUserProfile } from '../store/userSlice';

export const ProfilePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    // Локальное состояние для всех полей профиля
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    // Локальное состояние для паролей
    const [passwords, setPasswords] = useState({
        password: '',
        password_confirm: ''
    });

    const [statusMsg, setStatusMsg] = useState<{ type: string, text: string } | null>(null);

    // Подтягиваем данные из Redux при загрузке
    useEffect(() => {
        setFormData({
            username: user.username || '',
            email: user.email || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
        });
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMsg(null);

        // Сбор данных для отправки
        const dataToSave: any = { ...formData };

        // Если пользователь начал вводить пароль
        if (passwords.password || passwords.password_confirm) {
            if (passwords.password !== passwords.password_confirm) {
                setStatusMsg({ type: 'danger', text: "Новые пароли не совпадают!" });
                return;
            }
            if (passwords.password.length < 6) {
                setStatusMsg({ type: 'danger', text: "Пароль должен быть не менее 6 символов!" });
                return;
            }
            dataToSave.password = passwords.password;
            dataToSave.password_confirm = passwords.password_confirm;
        }

        try {
            // Используем твой thunk, который теперь умеет принимать и пароли
            await dispatch(updateUserProfile(dataToSave)).unwrap();
            setStatusMsg({ type: 'success', text: "Профиль успешно обновлен!" });
            setPasswords({ password: '', password_confirm: '' }); // Очищаем поля пароля
        } catch (err: any) {
            setStatusMsg({ type: 'danger', text: err || "Ошибка при обновлении профиля" });
        }
    };

    return (
        <Container className="mt-5 pb-5">
            <h2 className="text-white fw-bold display-5 mb-4" style={{ letterSpacing: '-1px' }}>
                Личный кабинет
            </h2>

            {statusMsg && (
                <Alert variant={statusMsg.type} onClose={() => setStatusMsg(null)} dismissible>
                    {statusMsg.text}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row className="g-4">
                    {/* Левая колонка: Визитка */}
                    <Col lg={4}>
                        <Card className="h-100 shadow-sm border-0 bg-element">
                            <Card.Body className="text-center d-flex flex-column justify-content-center p-4">
                                <div className="rounded-circle bg-primary d-inline-block p-4 mb-3 mx-auto" style={{ width: 'fit-content' }}>
                                    <span style={{ fontSize: '3rem' }}>👤</span>
                                </div>
                                <h3 className="text-white mb-1">{user.username}</h3>
                                <p className="small">ID: {user.id}</p>
                                <p className="text-white-50">{user.email}</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Правая колонка: Форма редактирования */}
                    <Col lg={8}>
                        <Card className="shadow-sm border-0 p-4 bg-element">
                            <h4 className="text-accent-yellow mb-4" style={{ color: 'var(--accent-yellow)' }}>
                                Основные данные
                            </h4>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Имя пользователя</Form.Label>
                                        <Form.Control
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="Username"
                                            disabled // Обычно username менять нельзя, но если на бэке можно — убери disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Имя</Form.Label>
                                        <Form.Control
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Фамилия</Form.Label>
                                        <Form.Control
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr className="bg-secondary my-4" />

                            <h4 className="text-accent-yellow mb-4" style={{ color: 'var(--accent-yellow)' }}>
                                Безопасность (смена пароля)
                            </h4>
                            <p className="small mb-3">Оставьте поля пустыми, если не хотите менять пароль</p>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Новый пароль</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            value={passwords.password}
                                            onChange={handlePasswordChange}
                                            placeholder="Минимум 6 символов"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Подтвердите пароль</Form.Label>
                                        <Form.Control
                                            name="password_confirm"
                                            type="password"
                                            value={passwords.password_confirm}
                                            onChange={handlePasswordChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="mt-4 d-grid">
                                <Button variant="primary" type="submit" size="lg" className="px-5 shadow-sm">
                                    💾 Сохранить все изменения
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};