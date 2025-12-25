import { type FC } from 'react';
import { Container, Carousel } from 'react-bootstrap'; 

export const HomePage: FC = () => {
    return (
        <Container fluid className="p-0"> 
            
            <Carousel data-bs-theme="dark" interval={5000}>
                
                {/* Слайд 1 */}
                <Carousel.Item>
                    <div 
                        className="d-flex flex-column justify-content-center align-items-center text-center" 
                        style={{ height: '85vh' }} // <--- ВЫСОТА 85% от экрана
                    >
                        <h1 className="display-3 fw-bold" style={{ color: '#FFD304' }}>Лаборатория IRC</h1>
                        <p className="fs-4 mx-auto mt-3 col-md-8">
                            Добро пожаловать в систему расчета промышленных реагентов. 
                            Ознакомьтесь с нашими химическими процессами и начните работу прямо сейчас!
                        </p>
                    </div>
                </Carousel.Item>

                {/* Слайд 2 */}
                <Carousel.Item>
                    <div 
                        className="d-flex flex-column justify-content-center align-items-center bg-light text-center" 
                        style={{ height: '85vh' }}
                    >
                        <h2 className="display-4 fw-bold">Точность и Эффективность</h2>
                        <p className="fs-4 mx-auto mt-3 col-md-8">
                            Наша система позволяет рассчитывать массы реагентов с учетом коэффициентов запаса и процента выхода реакции.
                        </p>
                    </div>
                </Carousel.Item>

                {/* Слайд 3 */}
                <Carousel.Item>
                    <div 
                        className="d-flex flex-column justify-content-center align-items-center bg-light text-center" 
                        style={{ height: '85vh' }}
                    >
                        <h2 className="display-4 fw-bold">Начните свой проект</h2>
                        <p className="fs-4 mx-auto mt-3 col-md-8">
                            Перейдите в раздел "Список процессов" в меню сверху, чтобы выбрать необходимый процесс.
                        </p>
                    </div>
                </Carousel.Item>

            </Carousel>
        </Container>
    );
};