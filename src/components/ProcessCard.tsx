import type { FC } from 'react'
import { Card } from 'react-bootstrap'
import type { ChemicalProcess } from '../types'
import { Link } from 'react-router-dom'

const DEFAULT_IMAGE = '/default.png'; 

interface Props {
    process: ChemicalProcess;
}

export const ProcessCard: FC<Props> = ({ process }) => {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img 
                variant="top" 
                src={process.image || DEFAULT_IMAGE} 
                style={{ height: '200px', objectFit: 'cover' }} 
            />
            <Card.Body>
                <Card.Title>{process.name}</Card.Title>
                <Card.Text>
                    <strong>Вход:</strong> {process.input_mass} кг ({process.input_reagent})<br/>
                    <strong>Выход:</strong> {process.output_mass} кг
                </Card.Text>
                <Link to={`/processes/${process.id}`} className="btn btn-primary w-100">
                    Подробнее
                </Link>
            </Card.Body>
        </Card>
    );
};