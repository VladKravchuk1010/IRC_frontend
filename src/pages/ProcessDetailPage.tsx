import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner, Alert, Card, Badge, Button } from 'react-bootstrap';
import { BreadCrumbs } from '../components/BreadCrumbs';
import type { ChemicalProcess } from '../types';

const API_BASE_URL = 'http://localhost:3000';
const DEFAULT_IMAGE = API_BASE_URL + '/default.png';

export const ProcessDetailPage: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [process, setProcess] = useState<ChemicalProcess | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(`/api/chemical-processes/${id}/`);
                if (!response.ok) throw new Error('Технологический процесс не найден');
                const data = await response.json();
                setProcess(data);
            } catch (err) {
                setError("Ошибка загрузки спецификации процесса");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" variant="warning" /></Container>;
    if (error || !process) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-4 pb-5">
            <BreadCrumbs crumbs={[
                { label: 'База процессов', path: '/processes' },
                { label: process.name }
            ]} />

            <Card className="bg-element border-0 shadow-lg overflow-hidden">
                <Row className="g-0">
                    <Col lg={5} className="position-relative">
                        <Image
                            src={process.image || DEFAULT_IMAGE}
                            className="w-100 h-100 object-fit-cover shadow-lg"
                            style={{ minHeight: '400px', filter: 'brightness(0.9)' }}
                        />
                        <div className="position-absolute top-0 start-0 m-3">
                            <Badge bg="warning" className="text-dark p-2 fs-6 shadow">
                                КПД {process.yield_percent}%
                            </Badge>
                        </div>
                    </Col>

                    <Col lg={7} className="p-4 p-md-5 d-flex flex-column bg-dark text-white">
                        <div className="mb-auto">
                            <h1 className="display-5 fw-bold text-accent-yellow mb-3">{process.name}</h1>
                            <p className="fs-5 text-white-50 lh-lg mb-4">
                                {process.description || 'Описание технологического процесса находится в стадии наполнения технической документацией.'}
                            </p>

                            <Row className="g-3 mb-4">
                                <Col sm={6}>
                                    <div className="p-3 rounded bg-element border border-secondary h-100">
                                        <div className="text-warning small mb-1 text-uppercase fw-bold">Входной реагент</div>
                                        <div className="fs-5">{process.input_reagent}</div>
                                        <div className="text-white-50">{process.input_mass} кг / ед.</div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="p-3 rounded bg-element border border-secondary h-100">
                                        <div className="text-info small mb-1 text-uppercase fw-bold">Целевой продукт</div>
                                        <div className="fs-5">{process.output_product}</div>
                                        <div className="text-white-50">{process.output_mass} кг / ед.</div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="p-4 rounded-4 bg-black border border-warning border-opacity-25 mb-4 text-center shadow-inner">
                                <div className="text-white-50 small mb-2">ХИМИЧЕСКОЕ УРАВНЕНИЕ РЕАКЦИИ</div>
                                <code className="fs-4 text-warning fw-bold" style={{ letterSpacing: '2px' }}>
                                    {process.reaction_equation}
                                </code>
                            </div>
                        </div>

                        <div className="d-flex gap-3 mt-4">
                            <Button
                                variant="outline-warning"
                                size="lg"
                                className="px-4 rounded-pill fw-bold"
                                onClick={() => navigate('/processes')}
                            >
                                ← В каталог
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};