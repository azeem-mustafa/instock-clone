import "./EditInventoryPage.scss";
import EditInventoryHeader from "../../components/EditInventoryHeader/EditInventoryHeader";
import EditInventoryForm from "../../components/EditInventoryForm/EditInventoryForm";

const EditInventoryPage = () => {
  const testInventory = {
    id: "fdsfafdsjr-573483-fshoiq-9053fh",
    warehouseID: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
    warehouseName: "King West",
    itemName: "Screen Monitor",
    description: "Dell UltraSharp 27 4K PremierColor Monitor.",
    category: "Electronics",
    status: "In Stock",
    quantity: 45,
  };

  return (
    <div className="inventory">
      <EditInventoryHeader header="Edit Inventory Item" />
      <EditInventoryForm inventory={testInventory} />
    </div>
  );
};

export default EditInventoryPage;
