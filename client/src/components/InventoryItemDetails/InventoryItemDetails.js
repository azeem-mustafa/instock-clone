import "./InventoryItemDetails.scss";

const InventoryItemDetails = ({ item }) => {
  console.log(item);

  return (
    <div className="item">
      <div className="item__description-container">
        <div className="item__description">
          <div className="item__description-header">ITEM DESCRIPTION:</div>
          <div className="item__paragraph">{item.description}</div>
        </div>
        <div className="item__category-container">
          <div className="item__category-header">CATEGORY:</div>
          <div className="item__category">{item.category}</div>
        </div>
      </div>
      <div className="item__info-container">
        <div className="item__info">
          <div className="item__status-container">
            <div className="item__status-header">STATUS:</div>
            <div
              className={
                item.status === "In Stock"
                  ? "item__status"
                  : "item__status--out"
              }
            >
              {item.status}
            </div>
          </div>
          <div className="item__quantity-container">
            <div className="item__quantity-header">QUANTITY:</div>
            <div className="item__quantity">{item.quantity}</div>
          </div>
        </div>
        <div className="item__location-container">
          <div className="item__location-header">WAREHOUSE:</div>
          <div className="item__location">{item.warehouseName}</div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;
