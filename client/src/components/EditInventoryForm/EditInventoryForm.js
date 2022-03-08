import "./EditInventoryForm.scss";
import React from "react";
import { withRouter } from "react-router";

class EditInventoryForm extends React.Component {
  state = {
    warehouse: this.props.inventory.warehouse,
    name: this.props.inventory.itemName,
    description: this.props.inventory.description,
    category: this.props.inventory.category,
    status: this.props.inventory.status,
    quantity: this.props.inventory.quantity || 0,
  };

  // handleCancel = () => {

  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault(e);
    // console.log(this.state.name, this.state.description);
    if (
      this.state.name === "" ||
      this.state.description === "" ||
      this.state.quantity === ""
    ) {
      console.log(`Item name, description, and quantity can't be emtpy`);
      return;
    }

    console.log("no error");

    // axios.put(API_URL, {
    //     id: this.props.inventory.id
    //     warehouseName: e.target.warehouse.value,
    //     itemName: e.target.name.value,
    //     description: e.target.description.value,
    //     category: e.target.category.value,
    //     status: e.target.status.value,
    //     quantity: e.target.quantity.value
    // })
    //     .then()
    //     .catch(console.log())
  };

  render() {
    // console.log("match", this.props.history);
    return (
      <div className="edit-inventory">
        <form action="" onSubmit={this.handleSubmit} method="PUT">
          <div className="edit-inventory__main-container">
            <div className="edit-inventory__details-container">
              <h2 className="edit-inventory__details-header">Item Details</h2>
              <div className="edit-inventory__name-container">
                <label className="edit-inventory__name-label" htmlFor="name">
                  Item Name
                </label>
                <input
                  className="edit-inventory__name-input"
                  htmlFor="name"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div className="edit-inventory__description-container">
                <label
                  className="edit-inventory__description-label"
                  htmlFor="description"
                  name="description"
                >
                  Description
                </label>
                <textarea
                  className="edit-inventory__description-textarea"
                  name="description"
                  htmlFor="description"
                  id=""
                  onChange={this.handleChange}
                  value={this.state.description}
                ></textarea>
              </div>
              <div className="edit-inventory__category-container">
                <label
                  className="edit-inventory__category-label"
                  htmlFor="category"
                  name="category"
                >
                  Category
                </label>
                <div className="edit-inventory__select">
                  <select
                    value={this.state.category}
                    onChange={this.handleChange}
                    className="edit-inventory__category-selector"
                    name="category"
                    id=""
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Gear">Gear</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Health">Health</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="edit-inventory__availability-container">
              <h2 className="edit-inventory__availability-header">
                Item Availability
              </h2>
              <div className="edit-inventory__status-container">
                <label
                  className="edit-inventory__status-label"
                  htmlFor="status"
                  name="status"
                >
                  Status
                </label>
                <div className="edit-inventory__radio-buttons">
                  <input
                    className="edit-inventory__radio-btn"
                    type="radio"
                    name="status"
                    value="In Stock"
                    onChange={this.handleChange}
                    checked={this.state.status === "In Stock"}
                  />
                  <label
                    className="edit-inventory__radio-label"
                    htmlFor="In Stock"
                  >
                    In Stock
                  </label>
                  <input
                    className="edit-inventory__radio-btn"
                    type="radio"
                    name="status"
                    value="Out of stock"
                    onChange={this.handleChange}
                    checked={this.state.status === "Out of stock"}
                  />
                  <label
                    className="edit-inventory__radio-label"
                    htmlFor="Out of stock"
                  >
                    Out of stock
                  </label>
                </div>
              </div>

              {this.state.status === "In Stock" && (
                <div className="edit-inventory__quantity-container">
                  <label
                    className="edit-inventory__quantity-label"
                    htmlFor="quantity"
                    name="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    className="edit-inventory__quantity"
                    type="number"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    name="quantity"
                  />
                </div>
              )}

              <div className="edit-inventory__warehouse-container">
                <label
                  className="edit-inventory__warehouse-label"
                  htmlFor="warehouse"
                  name="warehouse"
                >
                  Warehouse
                </label>
                <div className="edit-inventory__select">
                  <select
                    value={this.state.warehouse}
                    className="edit-inventory__warehouse-selector"
                    onChange={this.handleChange}
                    name="warehouse"
                    id=""
                  >
                    <option value="Manhattan">Manhattan</option>
                    <option value="King West">King West</option>
                    <option value="Granville">Granville</option>
                    <option value="San Fran">San Fran</option>
                    <option value="Santa Monica">Santa Monica</option>
                    <option value="Seattle">Seattle</option>
                    <option value="Montreal">Montreal</option>
                    <option value="Boston">Boston</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="edit-inventory__buttons">
            <input
              className="edit-inventory__cancel"
              type="button"
              value="Cancel"
              onClick={this.props.history.goBack}
            />
            <input
              className="edit-inventory__save"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditInventoryForm);
