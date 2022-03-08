import "../InventoryList/InventoryList.scss";
import React, { Component } from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import InventoryProps from "./InventoryProps";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { API_URL } from "../../utils/API";
import axios from "axios";
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";
import { Link } from "react-router-dom";

class InventoryList extends Component {
  state = {
    inventory: null,
    delete: false,
    deletedItem: null
  };

  //Get all inventory

  getInventory = () => {
    axios.get(`${API_URL}/inventory`).then((res) => {
      this.setState({
        inventory: res.data,
      });
      // console.log(res.data);
    });
  };

  componentDidMount() {
    this.getInventory();
  }

  handleDelete = (clickedId, clickedName) => {
    console.log('clicked', clickedId)
    if(!this.state.delete){
        this.setState({
            delete: true,
            deletedItem: {
                id: clickedId,
                name: clickedName
            }
        })
    } else {
        this.setState({
            delete: false
        })
    }
}

  render() {
    if (!this.state.inventory) {
      return <p>Please wait, this page is loading...</p>;
    }

    return (
      <section className="inventory">
        <div className="inventoryList">
          <div className="box">
            <div>
              <h1 className="inventoryList__header">Inventory</h1>
            </div>
            <div>
              <div className="inventoryList__searchBar">
                <div>
                  <input
                    className="inventoryList__form"
                    type="name"
                    placeholder="Search..."
                  ></input>
                </div>
                <div>
                  <img
                    className="inventoryList__searchBar--searchIcon"
                    src={searchIcon}
                    alt="magnifyingGlass"
                  />
                </div>
              </div>
            </div>

            <div className="inventoryList__button">
              <Link to="/inventory/add">
                <button className="inventoryList__button--addItem">
                  + Add New Item
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className="tablet__screen">
              <div className="inventoryItem__container--mainheader">
                <h4>
                  INVENTORY ITEM
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
              <div className="inventoryItem__container--mainheader">
                <h4>
                  CATEGORY
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
              <div className="inventoryItem__container--mainheader">
                <h4>
                  STATUS
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
              <div className="inventoryItem__container--mainheader">
                <h4>
                  QTY{" "}
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
              <div className="inventoryItem__container--mainheader">
                <h4>
                  WAREHOUSE{" "}
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
              <div className="inventoryItem__container--mainheader-last">
                <h4>
                  ACTIONS
                  <img
                    className="inventoryItem__container--mainheader__sort"
                    src={sortIcon}
                    alt="sort"
                  ></img>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div>
          <InventoryProps handleDelete={this.handleDelete} inventory={this.state.inventory} />
          {this.state.delete ? <DeleteInventoryModal handleCancel={this.handleDelete} inventoryName={this.state.deletedItem.name} inventoryId={this.state.deletedItem.id} /> : null}
        </div>
      </section>
    );
  }
}

export default InventoryList;
