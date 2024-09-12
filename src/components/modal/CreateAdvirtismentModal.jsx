import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import MarketService from '../../API/MarketService';

function CreateAdvertisementModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    imageUrl: '',
    name: '',
    description: '',
    price: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting advertisement:', formData);

    try {
        const newAdvertisement = await MarketService.createAdvertisement(formData);
        console.log('Advertisement created:', newAdvertisement);
        onAdd();
        onClose();
    } catch (error) {
        console.error("Error creating advertisement:", error);
        alert('Failed to create advertisement. Please check the console for more details.');
    }
};


  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Advertisement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter title"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} type="submit" className="mt-3">
            Create
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAdvertisementModal;
