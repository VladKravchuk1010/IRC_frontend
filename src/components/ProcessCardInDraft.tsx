import { type FC } from 'react';
import { Col, Row, Image, Button, Form } from "react-bootstrap";

interface Props {
    processId: number | undefined;
    url: string | undefined;
    processName: string | undefined;
    count: number | undefined;
    result: string | null | undefined;
    imageClickHandler: () => void;
    isEditing: boolean;
    onRemove: (processId: number) => void;
    onQuantityChange: (processId: number, newQty: number) => void;
}

export const ProcessCardInDraft: FC<Props> = ({
    processId,
    url,
    processName,
    count,
    result,
    imageClickHandler,
    isEditing,
    onRemove,
    onQuantityChange
}) => {
    const DEFAULT_IMAGE_PATH = '/default.png';

    return (
        <div className="fav-card p-3 border rounded shadow-sm mb-3 bg-white">
            <Row className="align-items-center">
                {/* Изображение */}
                <Col xs={12} sm={3} md={2} className="mb-3 mb-sm-0">
                    <div className="d-flex justify-content-center">
                        <Image
                            src={url || DEFAULT_IMAGE_PATH}
                            alt={processName}
                            fluid rounded
                            style={{ maxHeight: '80px', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={imageClickHandler}
                        />
                    </div>
                </Col>

                {/* Инфо и Количества */}
                <Col xs={12} sm={6} md={7}>
                    <h5 className="mb-2">{processName}</h5>
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <span>Количество:</span>
                        <Form.Control
                            type="number"
                            size="sm"
                            value={count || 1}
                            disabled={!isEditing}
                            onChange={(e) => onQuantityChange(processId!, Number(e.target.value))}
                            style={{ width: '80px' }}
                            min="1"
                        />
                    </div>
                    {result && (
                        <div className="mt-2 text-primary small">
                            <strong>Результат:</strong> {result} кг.
                        </div>
                    )}
                </Col>

                <Col xs={12} sm={3} md={3} className="text-end mt-3 mt-sm-0">
                    {isEditing ? (
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemove(processId!)}
                            className="w-100 w-sm-auto"
                        >
                            Удалить услугу
                        </Button>
                    ) : (
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={imageClickHandler}
                            className="w-100 w-sm-auto"
                        >
                            Подробнее
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};