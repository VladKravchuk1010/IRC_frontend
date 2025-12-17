import { type FC, useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { updateUserProfile } from '../store/userSlice';

export const ProfilePage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { username, error } = useSelector((state: RootState) => state.user);
    // const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserProfile({ username, email }));
        alert("Запрос на обновление отправлен");
    };

    return (
        <Container className="mt-5">
            <Card className="mx-auto shadow-sm" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Card.Title>Личный кабинет: {username}</Card.Title>
                    {error && <Alert variant="info" className="mt-2">{error}</Alert>}
                    <Form onSubmit={handleSave} className="mt-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Новый Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="w-100">Сохранить</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};