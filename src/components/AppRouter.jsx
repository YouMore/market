import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import AdvertisementsPage from "../pages/AdvertisementsPage";
import OrdersPage from "../pages/OrdersPage";
import AdvertisementByIdPage from "../pages/AdvertisementByIdPage";

const AppRouter = () =>{
    return (
        <div>
          <Routes>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route exact path="/advertisements" element={<AdvertisementsPage/>} />
            <Route exact path="/advertisements/:id" element={<AdvertisementByIdPage/>} />
            <Route path="*" element={<Navigate to="/advertisements" replace />} />
          </Routes>
        </div>
    );
}

export default AppRouter