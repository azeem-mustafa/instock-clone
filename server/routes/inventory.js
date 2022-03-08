const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); //need this for post request
const { isValidData } = require("../middleware/checkValidation");

const inventoryPath = "./data/inventories.json";
const warehousesPath = "./data/warehouses.json";

//get all inventory from warehouse..

const getInventory = () => {
  const fileContent = fs.readFileSync(inventoryPath);
  const parsedFileContent = JSON.parse(fileContent);
  return parsedFileContent;
};

//get warehouses
const getWarehouses = () => {
  const fileContent = fs.readFileSync(warehousesPath);
  const parsedFileContent = JSON.parse(fileContent);
  return parsedFileContent;
};

// Sanitize user input for URL parameters (only allow numbers, letters and dashes) to avoid script injections
const filterIncomingId = (id) => {
  return id.replace(/[^a-z0-9\-]/gi, "");
};

const updateInventory = (inventoryId, requestData) => {
  let warehouses = getWarehouses();
  let warehouse = warehouses.find((warehouse) => {
    console.log(warehouse);
    return requestData.warehouseName === warehouse.name;
  });

  return {
    id: inventoryId,
    warehouseID: warehouse.id,
    warehouseName: requestData.warehouseName,
    itemName: requestData.itemName,
    description: requestData.description,
    category: requestData.category,
    status: requestData.status,
    quantity: requestData.quantity,
  };
};

router.get("/", (_req, res) => {
  try {
    const inventory = getInventory();
    return res.status(200).json(inventory);
  } catch (err) {
    return res.status(500).json({ error: "Path not found" });
  }
});

router.get("/:inventoryId", (req, res) => {
  const inventories = getInventory();
  const inventory = inventories.find(
    (inventory) => inventory.id === req.params.inventoryId
  );

  if (inventory) {
    res.status(200).json(inventory);
  } else {
    res
      .status(400)
      .json({ msg: `No inventory item with the id ${req.params.inventoryId}` });
  }
});

router.put("/:inventoryId", (req, res) => {
  console.log(req.body);
  let inventoryFound = false;
  let updatedInventoryDetails;
  const filteredId = filterIncomingId(req.params.inventoryId);
  let inventories = getInventory().map((inventory) => {
    if (inventory.id === filteredId) {
      inventoryFound = true;
      updatedInventoryDetails = updateInventory(inventory.id, req.body);
      return updatedInventoryDetails;
    } else {
      return inventory;
    }
  });

  if (inventoryFound) {
    fs.writeFileSync(inventoryPath, JSON.stringify(inventories, null, 2));
    res.status(200).json(updatedInventoryDetails);
  } else {
    res
      .status(400)
      .json({ msg: `No warehouse with the id ${req.params.inventoryId}` });
  }
});

//Delete an inventory item

router.delete("/:id", (req, res) => {
  const filteredId = filterIncomingId(req.params.id);
  const inventoryList = getInventory();
  let itemIndex;
  const itemToDelete = inventoryList.find((item, i) => {
    itemIndex = i;
    return item.id === filteredId;
  });

  if (itemToDelete) {
    inventoryList.splice(itemIndex, 1);
    fs.writeFileSync(inventoryPath, JSON.stringify(inventoryList));
    res.status(201).send("Inventory item deleted successfully");
  } else {
    res.status(404).send("Inventory item does not exist");
  }
});

router.post('/', (req, res) =>{
  const allInventoryItems = getInventory();
  const newInventoryItem = updateInventory(uuidv4(), req.body);
  allInventoryItems.push(newInventoryItem);

  fs.writeFileSync(inventoryPath, JSON.stringify(allInventoryItems, null, 2));

  res.status(200).json(newInventoryItem);
});

//Export to be used in Index.js
module.exports = router;
