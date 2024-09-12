import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import MarketService from '../API/MarketService';
import OrderList from '../components/orderList/OrderList';
import ShowItemsModal from '../components/modal/ShowItemsModal';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [limit] = useState(10); // Количество заказов на одной странице

    useEffect(() => {
        fetchOrders();
    }, [currentPage, sortOrder, selectedStatuses]);

    const fetchOrders = async () => {
        try {
            const data = await MarketService.getAllOrders();
            const filteredOrders = data.filter(order => 
                selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            );

            // Сортируем заказы по общей сумме
            const sortedOrders = filteredOrders.sort((a, b) => 
                sortOrder === 'asc' ? a.total - b.total : b.total - a.total
            );

            // Пагинация
            const start = (currentPage - 1) * limit;
            setOrders(sortedOrders.slice(start, start + limit));
            setTotalOrders(sortedOrders.length);
        } catch (error) {
            console.error("Ошибка при загрузке заказов:", error);
        }
    };

    const handleShowItems = (items) => {
        setCurrentItems(items);
        setIsModalOpen(true);
    };

    const handleCompleteOrder = async (orderId) => {
        try {
            const updatedOrder = await MarketService.updateOrderStatus(orderId, 4);
            console.log(`Статус заказа с ID ${orderId} изменен на:`, updatedOrder.status);
            
            // Обновление статуса заказа в состоянии
            setOrders((prevOrders) => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: updatedOrder.status } : order
                )
            );
        } catch (error) {
            console.error('Ошибка при обновлении статуса заказа:', error);
        }
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleStatusChange = (status) => {
        setSelectedStatuses((prevSelected) => {
            if (prevSelected.includes(status)) {
                return prevSelected.filter((s) => s !== status); // Удалить статус
            } else {
                return [...prevSelected, status]; // Добавить статус
            }
        });
    };

    const totalPages = Math.ceil(totalOrders / limit);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Список заказов</h1>
            
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="sortOrder">
                        <h4>Сортировать по сумме:</h4>
                        <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                </Row>
                <Col md={10}>
                    <h4>Фильтр по статусам:</h4>
                    <div className="d-flex flex-wrap">
                        {[0, 1, 2, 3, 4, 5, 6].map(status => (
                            <Form.Check 
                                key={status} 
                                type="checkbox" 
                                label={getStatusText(status)} 
                                checked={selectedStatuses.includes(status)} 
                                onChange={() => handleStatusChange(status)} 
                                className="mr-3"
                                style={{marginRight:"1rem"}}
                            />
                        ))}
                    </div>
                </Col>
            

            <OrderList 
                orders={orders}
                onShowItems={handleShowItems} 
                onCompleteOrder={handleCompleteOrder} 
            />

            {/* Пагинация */}
            <Pagination className="mt-4 justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item 
                        key={i} 
                        active={currentPage === i + 1} 
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {isModalOpen && (
                <ShowItemsModal 
                    items={currentItems} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </Container>
    );
};

// Функция для получения текстового представления статуса
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

export default OrdersPage;
