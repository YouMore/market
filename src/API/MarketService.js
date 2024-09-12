export default class MarketService {
    // Advertisements

    static async getAllAdvertisements(limit, start) {
        const response = await fetch(`http://localhost:8000/advertisements?_start=${start}&_limit=${limit}`);
        const data = await response.json();
        return data;
    }

    static async getAdvertisementById(id) {
        const response = await fetch(`http://localhost:8000/advertisements/${id}`);
        const data = await response.json();
        return data;
    }

    static async createAdvertisement(advertisement) {
        const response = await fetch('http://localhost:8000/advertisements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(advertisement)
        });
        console.log("Add")
        const data = await response.json();
        return data;
    }

    static async updateAdvertisement(id, updatedAdvertisement) {
        const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAdvertisement)
        });
        const data = await response.json();
        return data;
    }

    static async patchAdvertisement(id, partialUpdate) {
        const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partialUpdate)
        });
        const data = await response.json();
        return data;
    }

    static async deleteAdvertisement(id) {
        const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }

    // Orders

    static async getAllOrders(limit = 10, start = 0) {
        const response = await fetch(`http://localhost:8000/orders?_start=${start}&_limit=${limit}`);
        const data = await response.json();
        return data;
    }

    static async getOrderById(id) {
        const response = await fetch(`http://localhost:8000/orders/${id}`);
        const data = await response.json();
        return data;
    }

    static async updateOrder(id, updatedOrder) {
        const response = await fetch(`http://localhost:8000/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        });
        const data = await response.json();
        return data;
    }

    static async patchOrder(id, partialUpdate) {
        const response = await fetch(`http://localhost:8000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partialUpdate)
        });
        const data = await response.json();
        return data;
    }

    static async deleteOrder(id) {
        const response = await fetch(`http://localhost:8000/orders/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }

    
    static async getFilteredAdvertisements(params) {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`http://localhost:8000/advertisements?${query}`);
        const data = await response.json();
        return data;
    }
    static async updateOrderStatus(id, status) {
        const response = await fetch(`http://localhost:8000/orders/${id}`, {
            method: 'PATCH', // Используем PATCH для обновления только части данных
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status }) // Отправляем только статус
        });
        const data = await response.json();
        return data;
    }
    
}

