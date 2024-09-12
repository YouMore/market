import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AdvertisementList from '../advertisementsList/AdvertisementsList';

const ShowItemsModal = ({ items, onClose }) => {
    const advertisements = items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        createdAt: item.createdAt,
        views: item.views,
        likes: item.likes,
        imageUrl: item.imageUrl,
        count: item.count // Добавляем количество для отображения
    }));

    return (
        <Modal show onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Товары в заказе</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Передаем список товаров в компонент AdvertisementList */}
                <AdvertisementList advertisements={advertisements} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowItemsModal;
