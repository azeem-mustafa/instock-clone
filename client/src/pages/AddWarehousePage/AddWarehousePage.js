import './AddWarehousePage.scss';
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';

const AddWarehousePage = ({ history }) => {
    const handleCancel = () => {
        history.push('/');
    }
    
    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log(e.target.formErrors.value)

        if(e.target.formErrors.value === "true") {
            console.log("Errors present")
            return;
        }

        axios.post('http://localhost:8080/warehouses', {
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
                alert('New warehouse added!');
                history.push('/');
            })
            .catch((error) => console.log(error))
    }

    return (
        <main className="add-warehouse">
            <header className="add-warehouse__page-header">
                {/* onClick of arrow, go back to previous screen */}
                <img onClick={handleCancel} className="add-warehouse__back-arrow" src={backArrow} alt="back arrow"/>
                <h1 className="add-warehouse__page-title">Add New Warehouse</h1>
            </header>

            <form onSubmit={handleSubmit} className="add-warehouse__form">

                <WarehouseForm warehouse={{}} />

                <div className="add-warehouse__action-container">
                    <button onClick={handleCancel} className="add-warehouse__cancel">Cancel</button>
                    <button type="submit" className="add-warehouse__save">+ Add Warehouse</button>
                </div>
            </form>
        </main>
    );
};

export default AddWarehousePage;