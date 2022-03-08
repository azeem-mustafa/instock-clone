import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import Footer from "./components/Footer/Footer";
import Warehouses from "./components/Warehouses/Warehouses";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import InventoryList from "./components/InventoryList/InventoryList";
import AddInventory from "./components/AddNewInventory/AddNewInventory";
import EditInventoryPage from "./pages/EditInventoryPage/EditInventoryPage";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import DeleteInventoryModal from "./components/DeleteInventoryModal/DeleteInventoryModal";
import DeleteWarehouseModal from "./components/DeleteWarehouseModal/DeleteWarehouseModal";
import ItemDetailsPage from "./pages/ItemDetailsPage/ItemDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <Modals /> */}

      <div className="parent">
        <div className="parent__container">
          <div className="parent__child-container">
            <Switch>
              <Route exact path="/" component={Warehouses}></Route>
              <Route exact path="/inventory" component={InventoryList}></Route>
              <Route exact path="/:warehouseId" component={WarehouseDetails} />
              <Route exact path="/warehouse/add" component={AddWarehousePage} />
              <Route
                exact
                path="/:warehouseId/edit"
                component={EditWarehousePage}
              />

              {/* <Route path="/inventory/:inventoryId" component={Specific Inventory Details}></Route> */}
              <Route exact path="/inventory/add" component={AddInventory} />
              <Route
                exact
                path="/inventory/:inventoryId"
                component={ItemDetailsPage}
              />
              <Route
                path="/inventory/:inventoryId/delete"
                exact
                component={DeleteInventoryModal}
              />
              {/* <Route path="/inventory/:inventoryId/delete" exact component={DeleteInventoryModal} /> */}
              {/* <Route exact path="/warehouse/:warehouseId/delete" exact component={DeleteWarehouseModal} /> */}
              <Route
                exact
                path="/inventory/:inventoryId/edit"
                component={EditInventoryPage}
              ></Route>
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
