import "../InventoryList/InventoryList.scss";
import "../InventoryList/InventoryList";
import chevonRight from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { Link } from "react-router-dom";

function AllInventoryList(props) {
  // console.log("inventory", props);
  return (
    <main>
      <div className="inventoryItem">
        {props.inventory.map((stock) => {
          return (
            <div key={stock.id} className="inventoryItem__cards">
              <div className="inventoryItem__header">
                <div className="inventoryItem__container">
                  <div>
                    <h4 className="inventoryItem__container--mainheader">
                      INVENTORY ITEM
                      <img
                        className="inventoryItem__container--mainheader__sort"
                        src={sortIcon}
                        alt="sort"
                      ></img>
                    </h4>
                    <p className="inventoryItem__paragraph">
                      {stock.itemName}
                      <img
                        className="inventoryItem__paragraph--chevron"
                        src={chevonRight}
                        alt="arrow"
                      />
                    </p>
                    <h4 className="inventoryItem__paragraph--title">
                      CATEGORY
                      <img
                        className="inventoryItem__container--mainheader__sort"
                        src={sortIcon}
                        alt="sort"
                      ></img>
                    </h4>

                    <p>{stock.category}</p>
                    <img
                      onClick={() => props.handleDelete(stock.id, stock.itemName)}
                      className="inventoryItem__paragraph--delete"
                      src={deleteIcon}
                      alt="delete"
                    />
                  </div>
                  <div>
                    <h4 className="inventoryItem__paragraph--title">
                      STATUS
                      <img
                        className="inventoryItem__container--mainheader__sort"
                        src={sortIcon}
                        alt="sort"
                      ></img>
                    </h4>

                    <p className="inventoryItem__paragraph--stockStatus">
                      {" "}
                      {stock.status}
                    </p>
                    <h4 className="inventoryItem__paragraph--title">
                      QTY{" "}
                      <img
                        className="inventoryItem__container--mainheader__sort"
                        src={sortIcon}
                        alt="sort"
                      ></img>
                    </h4>
                    <p>{stock.quantity}</p>
                    <h4 className="inventoryItem__paragraph--title">
                      WAREHOUSE{" "}
                      <img
                        className="inventoryItem__container--mainheader__sort"
                        src={sortIcon}
                        alt="sort"
                      ></img>
                    </h4>
                    <p>{stock.warehouseName}</p>
                  </div>
                  <img
                    className="inventoryItem__paragraph--edit"
                    src={editIcon}
                    alt="edit"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="large__screen">
        {props.inventory.map((stock) => {
          return (
            <div>
              <div className="large__screen--data">
                <Link to={`/inventory/${stock.id}`}>
                  <p className="inventoryItem__paragraph">
                    {stock.itemName}
                    <img
                      className="inventoryItem__paragraph--chevron"
                      src={chevonRight}
                      alt="arrow"
                    />
                  </p>
                </Link>
                <div className="inventoryItem__paragraph--title">
                  <p>{stock.category}</p>
                </div>
                <div className="inventoryItem__paragraph--title">
                  <p
                    className={
                      stock.status === "Out of Stock"
                        ? "inventoryItem__paragraph--stockStatus-red"
                        : "inventoryItem__paragraph--stockStatus"
                    }
                  >
                    {stock.status}
                  </p>
                </div>
                <div className="inventoryItem__paragraph--title">
                  <p>{stock.quantity}</p>
                </div>
                <div className="inventoryItem__paragraph--title">
                  <p>{stock.warehouseName}</p>
                </div>

                <div className="large__screen--actions">
                  <img onClick={() => props.handleDelete(stock.id, stock.itemName)}className="delete" src={deleteIcon} alt="bin" />
                  <img className="edit" src={editIcon} alt="edit" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default AllInventoryList;
