import React from "react";
import { Redirect } from "react-router-dom";
import "./DeleteWarehouseModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";

function DeleteWarehouseModal({ handleCancel, warehouseName, warehouseId }){
    const handleDelete = id => {
        axios.delete(`http://localhost:8080/warehouses/${id}`)
            .then((res) => {
                console.log(res);
                alert('deleted');
                handleCancel();
            })
            .catch(console.log);
    };

  return (
    <section className="delete-modal">
      <div className="delete-modal__closeIcon">
        <img onClick={handleCancel} src={closeIcon} alt="close" />
      </div>
      <h3 className="delete-modal__header">
        {/* Add warehouse name here */}
        Delete {warehouseName} warehouse?
      </h3>
      <p className="delete-modal__paragraph">
        {/* Add warehouse name here */}
        Please confirm that you’d like to delete the {warehouseName} from the
        list of warehouses. You won’t be able to undo this action.
      </p>
      <div className="delete-modal__button-container">
        <button onClick={handleCancel} className="delete-modal__cancel">
          Cancel
        </button>
        {/* Add warehouse id to function call here */}
        <button
          onClick={() => handleDelete(warehouseId)}
          className="delete-modal__delete"
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default DeleteWarehouseModal;
