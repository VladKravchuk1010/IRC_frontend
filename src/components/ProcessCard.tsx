import type { FC } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap' // Добавляем Button, Spinner
import type { ChemicalProcess } from '../api/Api'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { addProcessToCalculation} from '../store/draftSlice';
import { fetchActiveCalculationStatus} from '../store/cartSlice';


interface Props {
    process: ChemicalProcess;
    defaultImagePath: string;
}

export const ProcessCard: FC<Props> = ({ process, defaultImagePath }) => {

    let sourceUrl: string | null = null;

    const path = process.image;
    sourceUrl = String(path);
    const shouldRenderImage = !!sourceUrl;

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const { id, loading: draftLoading } = useSelector((state: RootState) => state.draft);

    const handleAdd = async () => {
        if (process.id) {
            const resultAction = await dispatch(addProcessToCalculation({
                processId: process.id,
                quantity: 1,
                appId: id
            }));

            if (addProcessToCalculation.fulfilled.match(resultAction)) {
                dispatch(fetchActiveCalculationStatus())
            }
        }
    }

    return (
        <Card className="h-100 border-0 shadow-sm">

            {shouldRenderImage && (
                <Card.Img
                    variant="top"
                    src={sourceUrl!}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        // Предполагаем, что defaultImagePath уже полный путь или относительный
                        e.currentTarget.src = defaultImagePath;
                    }}
                />
            )}

            <Card.Body className='d-flex flex-column'>
                <Card.Title>{process.name}</Card.Title>
                <Card.Text>
                    <strong>Вход:</strong> {process.input_mass} кг ({process.input_reagent})<br />
                    <strong>Выход:</strong> {process.output_mass} кг
                </Card.Text>

                <div className="d-flex justify-content-center align-items-center mt-3 mt-auto">
                    <Link to={`/processes/${process.id}`} className="btn btn-primary" style={{ flex: 1, marginRight: '10px', height: '42px' }}>
                        Подробнее
                    </Link>

                    {/* Кнопка "Добавить" */}
                    {(isAuthenticated == true) && (
                        <Button
                            className="city-btn"
                            variant="success"
                            onClick={handleAdd}
                            disabled={!process.id || draftLoading}
                            style={{ flex: 1, height: '42px' }}
                        >
                            {draftLoading ? (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                'Добавить'
                            )}
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};