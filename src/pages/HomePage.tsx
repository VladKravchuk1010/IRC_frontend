import { type FC } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
    return (
        <Container fluid className="mt-5 text-center">
            <div className="p-5 mb-4 bg-light rounded-3">
                <h1 className="display-5 fw-bold">Лаборатория IRC</h1>
                <p className="col-md-8 fs-4 mx-auto">
                    Добро пожаловать в систему расчета промышленных реагентов. 
                    Здесь вы можете ознакомиться с нашими услугами и создать заявку на расчет.
                </p>
                <Link to="/processes">
                    <Button variant="primary" size="lg">Перейти к услугам</Button>
                </Link>
            </div>

        </Container>
    );
};