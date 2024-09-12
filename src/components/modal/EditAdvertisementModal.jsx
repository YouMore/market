import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Импортируем нужные компоненты из react-bootstrap
import MarketService from '../../API/MarketService'; // Импортируйте MarketService

const EditAdvertisementModal = ({ advertisement, onClose, onEdit, advertisementId }) => {
    const [updatedAdvertisement, setUpdatedAdvertisement] = useState(advertisement);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAdvertisement({
            ...updatedAdvertisement,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Обновляем объявление на сервере
            const updatedData = await MarketService.updateAdvertisement(advertisementId, updatedAdvertisement);
            onEdit(updatedData); // Передаем обновленные данные обратно
        } catch (error) {
            console.error('Error updating advertisement:', error);
            // Здесь можно добавить обработку ошибок, например, уведомление для пользователя
        }
    };

    return (
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Advertisement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={updatedAdvertisement.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={updatedAdvertisement.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={updatedAdvertisement.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={updatedAdvertisement.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Button variant="secondary" onClick={onClose} className="me-2">
                            Cancel
                        </Button>

                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAdvertisementModal;
