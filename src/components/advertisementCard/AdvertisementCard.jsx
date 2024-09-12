import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card} from 'react-bootstrap';
import './AdvertisementCard.module.css'

function AdvertisementCard({ advertisement }) {
    const navigate = useNavigate();

    if (!advertisement) {
        return <div>Loading...</div>; // Можно отобразить лоадер или другой контент
    }

    return (
        <Card className="mb-3" style={{ width: '22rem' }} onClick={() => navigate(`/advertisements/${advertisement.id}`)}> {/* Увеличил ширину карточки */}
            <Card.Img 
                variant="top" 
                src={advertisement?.imageUrl && advertisement.imageUrl.trim() !== '' 
                    ? advertisement.imageUrl 
                    : '/what.jpg'} 
                alt={advertisement?.name || 'No name'}
                style={{ height: '200px', objectFit: 'contain' }} /* Увеличил высоту и использую objectFit: 'contain' */
            />
            <Card.Body>
                <Card.Title>{advertisement?.name || 'No name'}</Card.Title>
                <Card.Text>
                    <strong>Price:</strong> ${advertisement?.price || 'N/A'} <br />
                    <strong>Views:</strong> {advertisement?.views || 0} <br />
                    <strong>Likes:</strong> {advertisement?.likes || 0}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default AdvertisementCard;
