import "./ItemDetailsPage.scss";
import { useEffect, useState } from "react";
import EditInventoryHeader from "../../components/EditInventoryHeader/EditInventoryHeader";
import InventoryItemDetails from "../../components/InventoryItemDetails/InventoryItemDetails";
import axios from "axios";

const ItemDetailsPage = (props) => {
  //   console.log("params", props.match.params);
  const [singleItem, setSingleItem] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/inventory/${props.match.params.inventoryId}`)
      .then((res) => setSingleItem(res.data));
  }, []);
  //   console.log("set single item", singleItem);
  if (!singleItem) {
    return `Loading...`;
  }
  return (
    <>
      <EditInventoryHeader header={singleItem.itemName} />
      <InventoryItemDetails item={singleItem} />
    </>
  );
};

export default ItemDetailsPage;
