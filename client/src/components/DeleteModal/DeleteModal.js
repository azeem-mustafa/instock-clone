import React from "react";
import "./DeleteModal.scss";
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';

function DeleteModal({ name, id, deleteType, history }){
    const handleDelete = id => {
        axios.delete(`http://localhost:8080/${deleteType}/${id}`)
            .then((res) => {
                console.log(res);
                alert('deleted');
                // Push back to inventory page once created
                history.push(`/${deleteType}`);
            })
            .catch(console.log);
    };

    const handleClose = () => {
        // Push back to inventory page once created
        history.push(`/${deleteType}`);
    };

    let headerText;
    let confirmationText;

    const generateText = () => {
        if(deleteType === 'warehouse') {
            headerText = `Delete ${name} warehouse?`;
            confirmationText = `Please confirm that you’d like to delete the ${name} from the list of warehouses. You won’t be able to undo this action.`;
        } else {
            headerText = `Delete ${name} inventory item?`;
            confirmationText = `Please confirm that you’d like to delete ${name} from the inventory list. You won’t be able to undo this action.`;
        }
    }

    generateText();

    return(
        <section className="delete-modal">
            <div className="delete-modal__closeIcon">
                <img onClick={handleClose} src={closeIcon} alt="close" />
            </div>
            <h3 className="delete-modal__header">
                {headerText}
            </h3>
            <p className="delete-modal__paragraph">
                {confirmationText}
            </p>
            <div className="delete-modal__button-container">
                <button onClick={handleClose} className="delete-modal__cancel">
                    Cancel
                </button>
                <button onClick={() => handleDelete(id)} className="delete-modal__delete">
                    Delete 
                </button>
            </div>
        </section>
    );    
}

export default DeleteModal;