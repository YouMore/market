import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import MarketService from '../API/MarketService';
import EditAdvertisementModal from '../components/modal/EditAdvertisementModal';

const AdvertisementByIdPage = () => {
    const { id } = useParams();
    const [advertisement, setAdvertisement] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAdvertisement = async () => {
            const data = await MarketService.getAdvertisementById(id);
            setAdvertisement(data);
        };

        fetchAdvertisement();
    }, [id]);

    const handleEditAdvertisement = (updatedAdvertisement) => {
        setAdvertisement(updatedAdvertisement);
        setIsModalOpen(false);
    };

    return (
        <Container className="mt-4">
            {advertisement ? (
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="text-center">
                        <Card.Img 
                            variant="top" 
                            src={advertisement?.imageUrl && advertisement.imageUrl.trim() !== '' 
                                ? advertisement.imageUrl 
                                : '/what.jpg'} 
                            alt={advertisement?.name || 'No name'}
                            style={{ height: '200px', objectFit: 'contain' }} /* Увеличил высоту и использую objectFit: 'contain' */
                        />
                            <Card.Body>
                                <Card.Title>{advertisement.name}</Card.Title>
                                <Card.Text>
                                    <strong>Price:</strong> ${advertisement.price}
                                    <br />
                                    <strong>Description:</strong> {advertisement.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {/* Модальное окно для редактирования объявления */}
            {isModalOpen && (
                <EditAdvertisementModal
                    advertisement={advertisement}
                    onClose={() => setIsModalOpen(false)}
                    onEdit={handleEditAdvertisement}
                    advertisementId={id} // Передаем ID объявления
                />
            )}
        </Container>
    );
};

export default AdvertisementByIdPage;
