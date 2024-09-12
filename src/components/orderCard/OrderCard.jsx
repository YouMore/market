import React from 'react';
import { Card, Button } from 'react-bootstrap';

const OrderCard = ({ order, onShowItems, onCompleteOrder }) => {
    const getStatusText = (status) => {
        switch (status) {
            case 0: return 'Создан';
            case 1: return 'Оплачен';
            case 2: return 'В доставке';
            case 3: return 'Доставлен в пункт';
            case 4: return 'Получен';
            case 5: return 'В архиве';
            case 6: return 'Возврат';
            default: return 'Неизвестный статус';
        }
    };

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Header as="h5">Заказ #{order.id}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Статус:</strong> {getStatusText(order.status)}
                </Card.Text>
                <Card.Text>
                    <strong>Сумма:</strong> ${order.total}
                </Card.Text>
                <Card.Text>
                    <strong>Дата создания:</strong> {new Date(order.createdAt).toLocaleString()}
                </Card.Text>
                <Card.Text>
                    <strong>Способ доставки:</strong> {order.deliveryWay}
                </Card.Text>
                <Card.Text>
                    <strong>Количество товаров:</strong> {order.items.reduce((acc, item) => acc + item.count, 0)}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button variant="info" onClick={() => onShowItems(order.items)}>
                        Показать все товары
                    </Button>
                    {order.status !== 4 && (
                        <Button variant="success" onClick={() => onCompleteOrder(order.id)}>
                            Завершить заказ
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderCard;
