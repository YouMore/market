import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OrderCard from '../orderCard/OrderCard';

const OrderList = ({ orders, onShowItems, onCompleteOrder }) => {
    return (
        <Container className="mt-4">
            <Row className="gy-4"> {/* gy-4 добавляет вертикальные отступы между строками */}
                {orders.map((order) => (
                    <Col key={order.id} md={6} lg={4}> {/* Размещение карточек в колонках */}
                        <OrderCard 
                            order={order} 
                            onShowItems={onShowItems} 
                            onCompleteOrder={onCompleteOrder} 
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default OrderList;
