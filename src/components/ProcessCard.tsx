import type { FC } from 'react'
import { Card } from 'react-bootstrap'
import type { ChemicalProcess } from '../types'
import { Link } from 'react-router-dom'

interface Props {
    process: ChemicalProcess;
    apiBaseUrl: string;
    defaultImagePath: string;
}

export const ProcessCard: FC<Props> = ({ process, apiBaseUrl, defaultImagePath }) => {
        
    let sourceUrl: string | null = null; 

    // 1. ПОСТРОЕНИЕ ПУТИ: Только если поле image заполнено (т.е. это не MOCK-данные)
    if (process.image && process.image.length > 0) {
        const path = process.image;

        if (path.startsWith('https')) {
            // АБСОЛЮТНЫЙ ПУТЬ (как в ProcessDetailPage)
            sourceUrl = path;
        } else { 
            // ОТНОСИТЕЛЬНЫЙ ПУТЬ (как в ProcessListPage)
            const cleanedPath = path.startsWith('/') ? path : '/' + path;
            sourceUrl = `${apiBaseUrl}${cleanedPath}`; // Собираем полный URL
        }
    }
    
    // 2. УСЛОВНЫЙ РЕНДЕРИНГ: Не рендерим Card.Img, если это MOCK (sourceUrl == null)
    const shouldRenderImage = !!sourceUrl;
    
    return (
        <Card className="h-100 shadow-sm">
            
            {shouldRenderImage && (
                 <Card.Img 
                    variant="top" 
                    src={sourceUrl!} // Используем собранный абсолютный URL
                    style={{ height: '200px', objectFit: 'cover' }} 
                    // 3. FALLBACK: Если даже абсолютный URL не сработал (404), показываем заглушку
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { 
                        e.currentTarget.src = defaultImagePath; 
                    }}
                />
            )}
            
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