import './EditWarehousePage.scss';
import { Component } from 'react';
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';


class EditWarehousePage extends Component {
    state = {
        selectedWarehouse: {}
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/warehouses/${this.props.match.params.warehouseId}`)
            .then((response) => {
                this.setState({ selectedWarehouse: response.data})
            })
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    /**
     * Submit handler that makes an axios.put request on submit if no errors are present on submit.
     * 
     * @param {object} e event object passed by handler 
     * @returns {undefined} early return if errors are present, or completes axios request
     */
        handleSubmit = (e) => {
        e.preventDefault(e);
        console.log(e.target.formErrors.value)

        if(e.target.formErrors.value === "true") {
            console.log('Errors present')
            return;
        }

        // Apply this once back-end is enabled.
        axios.put(`http://localhost:8080/warehouses/${this.props.match.params.warehouseId}`, {
            name: e.target.warehouseName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            country: e.target.country.value,
            contact: {
                name: e.target.contactName.value,
                position: e.target.position.value,
                phone: e.target.phone.value,
                email: e.target.email.value
                }
            })
            .then((response) => {
                console.log(response.data);
                alert('Warehouse updated!');
                this.props.history.push('/');
            })
            .catch(error => console.log(error))
    }
    
    render() {
        return (
            <main className="edit-warehouse">
                <header className="edit-warehouse__page-header">
                    <img onClick={this.handleCancel} className="add-warehouse__back-arrow" src={backArrow} alt="back arrow"/>
                    <h1 className="edit-warehouse__page-title">Edit Warehouse</h1>
                </header>
                <form onSubmit={this.handleSubmit} className="edit-warehouse__form">
    
                    <WarehouseForm warehouse={this.state.selectedWarehouse} />
    
                    <div className="edit-warehouse__action-container">
                        <button onClick={this.handleCancel} className="edit-warehouse__cancel">Cancel</button>
                        <button type="submit" className="edit-warehouse__save">Save</button>
                    </div>
                </form>
            </main>
        );
    };
}

export default EditWarehousePage;
