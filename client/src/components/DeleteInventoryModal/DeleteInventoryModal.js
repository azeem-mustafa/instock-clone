import React from "react";
import "./DeleteInventoryModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";

function DeleteInventoryModal({ handleCancel, inventoryName, inventoryId }){
    const handleDelete = id => {
        axios.delete(`http://localhost:8080/inventory/${id}`)
            .then((res) => {
                console.log(res);
                alert('deleted');
                handleCancel();
            })
            .catch(console.log);
    };

    return(
        <section className="delete-modal">
            <div className="delete-modal__closeIcon">
                <img onClick={handleCancel} src={closeIcon} alt="close" />
            </div>
            <h3 className="delete-modal__header">
                {/* Add inventory name here */}
                Delete {inventoryName} inventory item?
            </h3>
            <p className="delete-modal__paragraph">
                {/* Add inventory name here */}
                Please confirm that you’d like to delete {inventoryName} from the inventory list. You won’t be able to undo this action.
            </p>
            <div className="delete-modal__button-container">
                <button onClick={handleCancel} className="delete-modal__cancel">
                    Cancel
                </button>
                {/* Add inventory id to function call here */}
                <button onClick={() => handleDelete(inventoryId)} className="delete-modal__delete">
                    Delete 
                </button>
            </div>
        </section>
    );    
}

export default DeleteInventoryModal;
