import React from "react";
import "./_warehouses.scss";
import axios from "axios";
import ListedWarehouses from "../WarehousesList/WarehousesList";
import sortImg from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";
import DeleteWarehouseModal from "../DeleteWarehouseModal/DeleteWarehouseModal";

class Warehouses extends React.Component {
  state = {
    selectedWarehouse: null,
    delete: false,
    deletedItem: null,
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/warehouses`).then((response) => {
      console.log(response.data);
      this.setState({
        selectedWarehouse: response.data,
      });
    });
  }

  handleDelete = (clickedId, clickedName) => {
    console.log("clicked", clickedId);
    if (!this.state.delete) {
      this.setState({
        delete: true,
        deletedItem: {
          id: clickedId,
          name: clickedName,
        },
      });
    } else {
      this.setState({
        delete: false,
      });
    }
  };

  render() {
    if (this.state.selectedWarehouse === null) {
      return null;
    }

    console.log(this.state.selectedWarehouse);
    return (
      <main>
        <div className="main">
          <div className="main__flexbox">
            <h1 className="main__header">Warehouses</h1>

            <form className="main__form">
              <div className="main__form-flex">
                <input
                  type="text"
                  className="main__search"
                  name="user_search"
                  placeholder="Search"
                ></input>
                <Link to="/warehouse/add">
                  <button type="submit" className="main__button">
                    + Add New Warehouse
                  </button>
                </Link>
              </div>
            </form>
          </div>

          {/* THIS DOES NOT DISPLAY IN MOBILE */}

          <div className="main__warehouse-list">
            <div className="main__warehouse-list-flex-mimic">
              <div className="main__warehouse-list-warehouse box">
                <p className="main__warehouse-label label">WAREHOUSE</p>
                <img
                  className="main__warehouse-image image"
                  src={sortImg}
                  alt="sort logo"
                />
              </div>

              <div className="main__warehouse-list-address box">
                <p className="main__warehouse-label label">ADDRESS</p>
                <img
                  className="main__warehouse-image image"
                  src={sortImg}
                  alt="sort logo"
                />
              </div>
            </div>

            <div className="main__warehouse-list-name box">
              <p className="main__warehouse-label label">CONTACT NAME</p>
              <img
                className="main__warehouse-image image"
                src={sortImg}
                alt="sort logo"
              />
            </div>

            <div className="main__warehouse-list-information box">
              <p className="main__warehouse-label label">
                {" "}
                CONTACT INFORMATION
              </p>
              <img
                className="main__warehouse-image image"
                src={sortImg}
                alt="sort logo"
              />
            </div>

            <div className="main__warehouse-list-actions box">
              <p className="main__warehouse-label label">ACTIONS</p>
            </div>
          </div>

          {/* this is the end of the tablet and desktop bar that is hidden in mobile */}

          <ListedWarehouses
            handleDelete={this.handleDelete}
            warehouse={this.state.selectedWarehouse}
          />
          {this.state.delete ? (
            <DeleteWarehouseModal
              handleCancel={this.handleDelete}
              warehouseName={this.state.deletedItem.name}
              warehouseId={this.state.deletedItem.id}
            />
          ) : null}
        </div>
      </main>
    );
  }
}

export default Warehouses;
