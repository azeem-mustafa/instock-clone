import { Component } from "react";
import "./_addNewItem.scss";
import arrowIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { createRef } from "react";
import { Link } from "react-router-dom";

const formRef = createRef();

// import errorIcon from '../../assets/icons/error-24px.svg';
// import * as Validation from '../../utils/ValidationUtils';

class AddInventory extends Component {
  state = {
    item_name: "",
    item_desc: "",
    item_category: "",
    item_status: "",
    item_quantity: "",
    item_warehouse: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formName = formRef.current.item_name;
    const formDesc = formRef.current.item_desc;
    const formQty = formRef.current.item_quantity;

    if (this.isFormValid()) {
      axios
        .post(`http://localhost:8080/inventory`, {
          warehouseName: "",
          itemName: formName,
          description: formDesc,
          category: "",
          status: "",
          quantity: formQty,
        })
        .then((response) => {
          // this.props.history.push('/inventory')
          console.log(response.data);
        });
    } else {
      alert("failed to upload");
    }
  };

  isFormValid = () => {
    if (
      !this.state.item_name ||
      !this.state.item_desc ||
      !this.state.item_quantity
    ) {
      return false;
    }
  };

  render() {
    return (
      <main>
        <div className="main">
          <div className="main__inventory-flex">
            <Link className="main__inventory-flex-link" to="/inventory">
              <img className="main__arrow" src={arrowIcon} alt="arrow icon" />
            </Link>
            <h1 className="main__logo">Add New Inventory Item</h1>
          </div>
        </div>

        <div className="main__flex-box">
          <div className="main__sub-section-one">
            <h2 className="main__sub-section-logo">Item Details</h2>
            <form ref={formRef} className="main__form-one">
              <label className="main__form-label">Item Name</label>
              <input
                value={this.state.item_name}
                onChange={this.handleChange}
                className="main__input-item-name"
                type="text"
                name="item_name"
                placeholder="Item Name"
              ></input>

              <label className="main__form-label"> Description</label>
              <textarea
                value={this.state.item_desc}
                onChange={this.handleChange}
                className="main__input-item-desc"
                name="item_desc"
                placeholder="Please enter a brief item description"
              ></textarea>

              <label className="main__form-label">Category</label>
              <select
                value={this.state.category}
                onChange={this.handleChange}
                id=""
                className="main__input-select"
                name="item_category"
              >
                <option defaultValue="">Please select</option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Health">Health</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
              </select>
            </form>
          </div>

          <div className="main__sub-section-two">
            <h2 className="main__sub-section-logo-two">Item Availability</h2>

            <form ref={formRef} className="main__form-two">
              <label className="main__form-two-label">Status</label>

              <div className="main__form-two-radio-flex">
                <div className="main__form-two-in-stock">
                  <input
                    className="main__form-two-radio-button"
                    id="in_stock"
                    type="radio"
                    name="item_status"
                    value="in_stock"
                  />
                  <label htmlFor="in_stock">In Stock</label>
                </div>

                <div className="main__form-two-out-stock">
                  <input
                    className="main__form-two-radio-button"
                    id="out_stock"
                    type="radio"
                    name="item_status"
                    value="out_stock"
                  />
                  <label htmlFor="out_stock">Out of Stock</label>
                </div>
              </div>

              <label className="main__form-two-label">Quantity</label>
              <input
                className="main__form-two-input-quantity"
                value={this.state.item_quantity}
                onChange={this.handleChange}
                type="number"
                name="item_quantity"
                placeholder="0"
              ></input>

              <label className="main__form-two-label">Warehouse</label>
              <select
                value={this.state.item_warehouse}
                onChange={this.handleChange}
                className="main__form-two-warehouse-select"
                name="item_warehouse"
              >
                <option defaultValue="">Please select</option>
                <option value="Electronics">Electronics</option>
                <option value="Manhattan">Manhattan</option>
                <option value="King West">King West</option>
                <option value="Granville">Granville</option>
                <option value="San Fran">San Fran</option>
                <option value="Santa Monica">Santa Moinca</option>
                <option value="Seattle">Seattle</option>
                <option value="Montreal">Montreal</option>
              </select>

              <div className="main__form-two-button-flex">
                <Link className="main__form-two-button-flex-link" to="/">
                  {" "}
                  <button
                    type="submit"
                    className="main__form-two-button-cancel"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  className="main__form-two-button-add"
                >
                  Add New Item
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* buttons for tablet and desktop view */}

        <div className="main__form-two-button-flex-tablet">
          <Link className="main__form-two-button-flex-tablet-link" to="/">
            {" "}
            <button
              type="submit"
              className="main__form-two-button-cancel-tablet"
            >
              Cancel
            </button>
          </Link>
          <Link>
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="main__form-two-button-add-tablet"
            >
              Add Item
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

export default AddInventory;
