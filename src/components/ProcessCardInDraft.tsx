import { type FC } from 'react';
import { Col, Row, Image, Button } from "react-bootstrap";

interface Props {
    processId: number | undefined;
    itemId?: number;
    url: string | undefined;
    processName: string | undefined;
    count: number | undefined;
    result: string | null | undefined;
    imageClickHandler: () => void;
    // onRemove: (itemId: number) => void; // Для будущего удаления
}

export const ProcessCardInDraft: FC<Props> = ({
    processId,
    itemId,
    url,
    processName,
    count,
    result,
    imageClickHandler
    // onRemove
}) => {

    const DEFAULT_IMAGE_PATH = '/default.png';

    return (
        <div className="fav-card p-3 border rounded shadow-sm">
            <Row className="align-items-center">
                <Col xs={12} sm={3} md={2}>
                    <div className="d-flex justify-content-center">
                        <Image
                            src={url || DEFAULT_IMAGE_PATH}
                            alt={processName}
                            fluid rounded
                            style={{ maxHeight: '80px', objectFit: 'cover' }}
                        />
                    </div>
                </Col>
                <Col xs={12} sm={9} md={10}>
                    <div className="fav-card-body">
                        <h5>{processName}</h5>

                        <div className="form-group mb-2">
                            <Row className="align-items-center">
                                <Col xs={6} sm={4} md={3}>
                                    <label className="form-label mb-0">Количество:</label>
                                </Col>
                                <Col xs={6} sm={8} md={9}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={count || 1}
                                        disabled
                                        style={{ width: '80px', display: 'inline' }}
                                    />
                                </Col>
                            </Row>
                        </div>

                        {result && (
                            <p className="mb-2">
                                <strong>Результат расчета:</strong> {result}
                            </p>
                        )}

                        <Row className="mt-3">
                            <Col md={3} xs={6} className="mb-2 mb-md-0">
                                <Button onClick={imageClickHandler} variant="outline-primary" size="sm" className="w-100">
                                    Подробнее
                                </Button>
                            </Col>
                            <Col md={3} xs={6}>
                                {/* {itemId && (
                                    <Button variant="danger" size="sm" onClick={() => onRemove(itemId)} className="w-100">
                                        Удалить
                                    </Button>
                                )} */}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};