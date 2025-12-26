import { type FC, useState } from 'react';
import { Col, Row, Image, Button, Form } from "react-bootstrap";

interface Props {
    processId: number | undefined;
    url: string | undefined;
    processName: string | undefined;
    count: number | undefined;
    result: string | null | undefined;
    imageClickHandler: () => void;
    onRemove: (processId: number) => void;
    onQuantityChange: (processId: number, newQty: number) => void;
    isDraft: boolean;
}

export const ProcessCardInDraft: FC<Props> = ({
    processId,
    url,
    processName,
    count,
    result,
    imageClickHandler,
    onRemove,
    onQuantityChange,
    isDraft
}) => {
    const DEFAULT_IMAGE_PATH = '/default.png';

    // Локальное состояние для режима правки конкретной услуги
    const [isLocalEdit, setIsLocalEdit] = useState(false);
    const [tempCount, setTempCount] = useState(count || 1);

    const handleSaveClick = () => {
        onQuantityChange(processId!, tempCount);
        setIsLocalEdit(false);
    };

    return (
        <div className="fav-card p-3 border rounded shadow-sm mb-3 bg-white">
            <Row className="align-items-center">
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

                <Col xs={12} sm={6} md={7}>
                    <h5 className="mb-2">{processName}</h5>
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <span>Количество:</span>
                        {/* Поле ввода активно только если нажата кнопка "Изменить" */}
                        <Form.Control
                            type="number"
                            size="sm"
                            value={isLocalEdit ? tempCount : (count || 1)}
                            disabled={!isLocalEdit}
                            onChange={(e) => setTempCount(Number(e.target.value))}
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

                <Col xs={12} sm={3} md={3} className="text-end mt-3 mt-sm-0 d-flex flex-column gap-2">
                    {/* КНОПКИ МЕТОДОВ М-М (видны только в черновике) */}
                    {isDraft && (
                        <>
                            {isLocalEdit ? (
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={handleSaveClick}
                                    className="w-100"
                                >
                                    Сохранить (М-М)
                                </Button>
                            ) : (
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                        setTempCount(count || 1);
                                        setIsLocalEdit(true);
                                    }}
                                    className="w-100"
                                >
                                    Изменить (М-М)
                                </Button>
                            )}

                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onRemove(processId!)}
                                className="w-100"
                            >
                                Удалить услугу
                            </Button>
                        </>
                    )}

                    {!isDraft && (
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={imageClickHandler}
                            className="w-100"
                        >
                            Подробнее
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};