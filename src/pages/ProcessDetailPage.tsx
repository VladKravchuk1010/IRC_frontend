import { type FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Хук для получения ID из адреса
import { Container, Row, Col, Image, Spinner, Alert, Table } from 'react-bootstrap';
import { BreadCrumbs } from '../components/BreadCrumbs';
import type { ChemicalProcess } from '../types';

const API_BASE_URL = 'https://172.25.192.1:3000';
const DEFAULT_IMAGE = API_BASE_URL + '/default.png';

export const ProcessDetailPage: FC = () => {
    const { id } = useParams();
    const [process, setProcess] = useState<ChemicalProcess | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(API_BASE_URL + `/api/chemical-processes/${id}/`);
                if (!response.ok) throw new Error('Процесс не найден');
                const data = await response.json();
                setProcess(data);
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border"/></Container>;
    if (error || !process) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container fluid className="mt-4">
            {/* Хлебные крошки: Главная -> Список -> Название процесса */}
            <BreadCrumbs crumbs={[
                { label: 'Список услуг', path: '/processes' },
                { label: process.name } 
            ]} />

            <Row>
                <Col md={5}>
                    <Image src={process.image || DEFAULT_IMAGE} fluid rounded className="shadow-sm" />
                </Col>
                <Col md={7}>
                    <h2>{process.name}</h2>
                    <p className="text-muted">{process.description}</p>
                    
                    <Table striped bordered hover className="mt-4">
                        <tbody>
                            <tr>
                                <td>Входной реагент</td>
                                <td>{process.input_reagent} ({process.input_mass} кг)</td>
                            </tr>
                            <tr>
                                <td>Выходной продукт</td>
                                <td>{process.output_product} ({process.output_mass} кг)</td>
                            </tr>
                            <tr>
                                <td>Эффективность</td>
                                <td>{process.yield_percent}%</td>
                            </tr>
                            <tr>
                                <td>Уравнение</td>
                                <td><code>{process.reaction_equation}</code></td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};