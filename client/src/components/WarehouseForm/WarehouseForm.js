import './WarehouseForm.scss';
import { Component } from 'react';
import errorIcon from '../../assets/icons/error-24px.svg';
import * as Validation from '../../utils/ValidationUtils';

class WarehouseForm extends Component {
    // If props are sent to this component, initialize state of form fields with prop values.
    // If no props, initialize state with an empty string
    state = {
        warehouseName: this.props.warehouse.name || "",
        address: this.props.warehouse.address || "",
        city: this.props.warehouse.city || "",
        country: this.props.warehouse.country || "",
        contactName: this.props.warehouse.contact ? this.props.warehouse.contact.name : "",
        position: this.props.warehouse.contact ? this.props.warehouse.contact.position : "",
        phone: this.props.warehouse.contact ? this.props.warehouse.contact.phone : "",
        email: this.props.warehouse.contact ? this.props.warehouse.contact.email : "",
    };

    /**
     *  Applies changes to form fields to state. If text is entered into form, state is updated on each input.
     * @param {object} e event object automatically passed in by onClick
     * @returns {undefined} no return value
     */
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        Validation.checkInputForErrors(e.target.name, e.target.value);
    }

    componentDidUpdate(previousProps) {
        if(this.props.warehouse.name !== undefined && this.props.warehouse !== previousProps.warehouse) {
            this.setState({
                warehouseName: this.props.warehouse.name,
                address: this.props.warehouse.address,
                city: this.props.warehouse.city,
                country: this.props.warehouse.country,
                contactName: this.props.warehouse.contact.name,
                position: this.props.warehouse.contact.position,
                phone: this.props.warehouse.contact.phone,
                email: this.props.warehouse.contact.email,
            })
        }
    }
    
    /**
     * Loops through each of the properties currently held in state (all of the current input values) to check for errors in form input.
     * @returns {boolean} true if error is present, false if no errors.
     */
    checkFormErrors = () => {
        let error = false;
        for (const property in this.state) {
            if(Validation.checkInputForErrors(property, this.state[property])) {
                error = true;
            }
        };
        return error;
    }

    /**
     * Checks for input errors and displays JSX with error message if present.
     * @param {string} input 
     * @returns JSX containing error message, or empty tag
     */
    renderError = input => {
        if(!Validation.checkForText(input)) {
            return (
                <div>
                    <img className="warehouse-form__error-icon" src={errorIcon} alt="" />
                    <p className="warehouse-form__error">This field is required</p>
                </div>
            );
        }
        if(this.state.phone === input && !Validation.checkPhoneNumber(input)) {
            return (
                <div>
                    <img className="warehouse-form__error-icon" src={errorIcon} alt="" />
                    <p className="warehouse-form__error">Please enter a valid phone number</p>
                </div>
            );
        }
        if(this.state.email === input && !Validation.checkEmail(input)) {
            return (
                <div>
                    <img className="warehouse-form__error-icon" src={errorIcon} alt="" />
                    <p className="warehouse-form__error">Please enter a valid email</p>
                </div>
            );
        }

        return;
    }


    render() {
        return (
            <>
                <fieldset className="warehouse-form__input-group warehouse-form__input-group--left">
                    <h2 className="warehouse-form__form-group-title">Warehouse Details</h2>
                    <label className="warehouse-form__field-label" htmlFor="warehouseName">Warehouse Name</label>
                    <input className={ 
                        !Validation.checkForText(this.state.warehouseName) // conditionally renders class if there is an error
                        ? "warehouse-form__input--error" : "warehouse-form__input"} 
                        type="text"
                        name="warehouseName" 
                        value={this.state.warehouseName}
                        onChange={this.handleChange}
                        placeholder="Warehouse Name"
                    />
                    {/* Display an error message below input field */}
                    {this.renderError(this.state.warehouseName)} 

                    <label className="warehouse-form__field-label" htmlFor="address">Street Address</label>
                    <input className={
                        !Validation.checkForText(this.state.address) 
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="address" 
                        value={this.state.address}
                        onChange={this.handleChange}
                        placeholder="Street Address"
                    />
                    {this.renderError(this.state.address)}

                    <label className="warehouse-form__field-label" htmlFor="city">City</label>
                    <input className={
                        !Validation.checkForText(this.state.city) 
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        placeholder="City"
                    />
                    {this.renderError(this.state.city)}

                    <label className="warehouse-form__field-label" htmlFor="country">Country</label>
                    <input className={
                        !Validation.checkForText(this.state.country) 
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="country"
                        value={this.state.country}
                        onChange={this.handleChange}
                        placeholder="Country"
                    />
                    {this.renderError(this.state.country)}
                </fieldset>
    
                <fieldset className="warehouse-form__input-group warehouse-form__input-group--right">
                    <h2 className="warehouse-form__form-group-title">Contact Details</h2>
                    <label className="warehouse-form__field-label" htmlFor="contactName">Contact Name</label>
                    <input className={
                        !Validation.checkForText(this.state.contactName) 
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="contactName"
                        value={this.state.contactName}
                        onChange={this.handleChange}
                        placeholder="Contact Name"
                    />
                    {this.renderError(this.state.contactName)}

                    <label className="warehouse-form__field-label" htmlFor="position">Position</label>
                    <input className={
                        !Validation.checkForText(this.state.position)
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="position"
                        value={this.state.position}
                        onChange={this.handleChange}
                        placeholder="Position"
                    />
                    {this.renderError(this.state.position)}

                    <label className="warehouse-form__field-label" htmlFor="phone">Phone Number</label>
                    <input className={
                        Validation.checkInputForErrors('phone', this.state.phone)
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="phone" 
                        value={this.state.phone}
                        onChange={this.handleChange}
                        placeholder="Phone Number"
                    />
                    {this.renderError(this.state.phone)}

                    <label className="warehouse-form__field-label" htmlFor="email">Email</label>
                    <input className={
                        Validation.checkInputForErrors('email', this.state.email)
                        ? "warehouse-form__input--error" : "warehouse-form__input"}
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                    />
                    {this.renderError(this.state.email)}

                    {/* Hidden input used by onSubmit handler to validate if form input is valid */}
                    <input type="text" name="formErrors" value={this.checkFormErrors()} hidden />
                </fieldset>
            </>
        );
    };
}


export default WarehouseForm;
