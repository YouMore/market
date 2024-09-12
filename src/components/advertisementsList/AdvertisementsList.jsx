import React from "react";
import { Container } from "react-bootstrap";
import AdvertisementCard from "../advertisementCard/AdvertisementCard";

const AdvertisementList = ({ advertisements }) => {
    console.log(advertisements);

    // Проверка на случай, если advertisements не будет массивом
    if (!advertisements || advertisements.length === 0) {
        return (
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                --- Can't Find Advertisements ---
            </h1>
        );
    }

    return (
        <Container>
            <h1 className="text-center my-4 border-bottom border-top">
                --- Advertisements ---
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {advertisements.map((advertisement) => (
                    <AdvertisementCard  
                        key={advertisement.id} // Добавляем уникальный key
                        advertisement={advertisement}
                    />
                ))}
            </div>
        </Container>
    );
};

export default AdvertisementList;
