const express = require("express");
const router = express.Router();
const fs = require("fs");
const { isValidData } = require("../middleware/checkValidation");
const { v4: uuidv4 } = require("uuid"); //need this for post request
const warehousesPath = "./data/warehouses.json";

//get all inventory from warehouse..

const getWarehouses = () => {
  const fileContent = fs.readFileSync(warehousesPath);
  const parsedFileContent = JSON.parse(fileContent);
  return parsedFileContent;
};

// Sanitize user input for URL parameters (only allow numbers, letters and dashes) to avoid script injections
const filterIncomingId = (id) => {
  return id.replace(/[^a-z0-9\-]/gi, "");
};

// Create a new warehouse object
const updateWarehouse = (warehouseId, requestData) => {
  return {
    id: warehouseId,
    name: requestData.name,
    address: requestData.address,
    city: requestData.city,
    country: requestData.country,
    contact: {
      name: requestData.contact.name,
      position: requestData.contact.position,
      phone: requestData.contact.phone,
      email: requestData.contact.email,
    },
  };
};

router.get("/", (_req, res) => {
  try {
    const warehouses = getWarehouses();
    return res.status(200).json(warehouses);
  } catch (err) {
    return res.status(500).json({ error: "Path not found" });
  }
});

// Add new warehouse 

router.post("/", (req, res) => {
  const allWarehouses = getWarehouses();
  const newWarehouse = updateWarehouse(uuidv4(), req.body);
  allWarehouses.push(newWarehouse);

  fs.writeFileSync(warehousesPath, JSON.stringify(allWarehouses, null, 2));

  res.status(200).json(newWarehouse);
})

//get single warehouse details

router.get("/:warehouseId", (req, res) => {
  const warehouses = getWarehouses();
  const warehouse = warehouses.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  if (warehouse) {
    res.status(200).json(warehouse);
  } else {
    res
      .status(400)
      .json({ msg: `No warehouse with the id ${req.params.warehouseId}` });
  }
});

// Update a single warehouse's details
// Middleware validates data or provides 404 error
router.put("/:warehouseId", isValidData, (req, res) => {
  let warehouseFound = false;
  let updatedWarehouseDetails;
  const filteredId = filterIncomingId(req.params.warehouseId);
  let warehouses = getWarehouses().map((warehouse) => {
    if (warehouse.id === filteredId) {
      warehouseFound = true;
      updatedWarehouseDetails = updateWarehouse(warehouse.id, req.body);
      return updatedWarehouseDetails;
    } else {
      return warehouse;
    }
  });

  if (warehouseFound) {
    fs.writeFileSync(warehousesPath, JSON.stringify(warehouses));
    res.status(200).json(updatedWarehouseDetails);
  } else {
    res
      .status(400)
      .json({ msg: `No warehouse with the id ${req.params.warehouseId}` });
  }
});

//Delete a wareHouse and the inventory

router.delete("/:id", (_req, res) => {
  const { id } = _req.params;
  const selectWarehouse = getWarehouses();
  const deleteWarehouse = selectWarehouse.find(
    (warehouse) => warehouse.id === id
  );
  const warehouseIndex = selectWarehouse.indexOf(deleteWarehouse);

  if (deleteWarehouse) {
    selectWarehouse.splice(warehouseIndex, 1);
    fs.writeFileSync(warehousesPath, JSON.stringify(selectWarehouse));
    res.status(201).send("Warehouse deleted successfully");
  } else {
    res.status(404).send("Warehouse does not exsists");
  }
});

//Export to be used in Index.js
module.exports = router;
