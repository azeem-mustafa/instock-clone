import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';
import "./WarehouseDetails.scss";
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import editPencil from '../../assets/icons/edit-24px-alt.svg';
import sortImg from '../../assets/icons/sort-24px.svg';
import WarehouseInventory from "../WarehouseInventory/WarehouseInventory";

class WarehouseDetails extends React.Component {

  state = {
    selectedWarehouse: null,
    inventoryItems: null,
  }

  // const {id, name, address, city, country, contact} = props;
  componentDidMount(){

    axios.get(`http://localhost:8080/inventory`).then(response => {
      this.setState({
        inventoryItems: response.data.filter((item) =>{
          return item.warehouseID === this.props.match.params.warehouseId
        })
      })
      axios.get(`http://localhost:8080/warehouses/${this.props.match.params.warehouseId}`).then(response => {
      this.setState({
        selectedWarehouse: response.data
  })

  })
})
  }



  render(){

    if (this.state.inventoryItems === null)
    {return null}

    if (this.state.selectedWarehouse === null)
    {return null}

    console.log(this.state.selectedWarehouse);
    console.log(this.state.inventoryItems)

  return (
    <div className="warehouse">
      
        <div className='warehouse__header'>
          <Link to='/'> <img className='warehouse__header-back' 
          src={backArrow} 
          alt='back arrow'/></Link>
        <h1 className='warehouse__header-text'>{this.state.inventoryItems[0].warehouseName}</h1>

        <Link to={`/inventory/${this.state.selectedWarehouse.id}/edit`}><button className='warehouse__header-edit'>
            <img className='warehouse__header-edit-img' src={editPencil} alt='edit'/></button></Link>

          {/* This is for tablet and desktop */}

         <Link to={`/inventory/${this.state.selectedWarehouse.id}/edit`}><button className='warehouse__header-edit-tablet'><img className='warehouse__header-edit-img-tablet' src={editPencil} alt='edit'/>Edit</button></Link>
        </div>
        <div className="warehouse__container">

        
        <div className="warehouse__address-container">
          <h4 className="warehouse__address-header">WAREHOUSE ADDRESS:</h4>
          <p className="warehouse__address">
            {this.state.selectedWarehouse.address},{" "}
            <span className="warehouse__address-span">{this.state.selectedWarehouse.city}, {this.state.selectedWarehouse.country}</span>
          </p>
        </div>
        <div className="warehouse__contact-details">
          <div className="warehouse__contact-container">
            <h4 className="warehouse__contact-header">CONTACT NAME:</h4>
            <p className="warehouse__contact-name">{this.state.selectedWarehouse.contact.name}</p>
            <p className="warehouse__contact-title">{this.state.selectedWarehouse.contact.position}</p>
          </div>
          <div className="warehouse__info-container">
            <h4 className="warehouse__info-header">CONTACT INFORMATION:</h4>
            <p className="warehouse__info-number">{this.state.selectedWarehouse.contact.phone}</p>
            <p className="warehouse__info-email">{this.state.selectedWarehouse.contact.email}</p>
          </div>
        </div>
        
      </div>
      
                {/* THIS DOES NOT DISPLAY IN MOBILE */}

                <div className='main__warehouse-list'>
                        <div className='main__warehouse-list-flex-mimic'>
                            
                        <div className='main__warehouse-list-warehouse box'>
                            <p className='main__warehouse-label label'>INVENTORY ITEM</p>
                            <img className='main__warehouse-image image' src= {sortImg} alt='sort logo'/>

                        </div>

                        <div className='main__warehouse-list-address box'>
                        <p className='main__warehouse-label label'>CATEGORY</p>
                        <img className='main__warehouse-image image' src= {sortImg} alt='sort logo'/>
                        </div>
                        </div>

                        <div className='main__warehouse-list-name box'>
                        <p className='main__warehouse-label label'>STATUS</p>
                        <img className='main__warehouse-image image' src= {sortImg} alt='sort logo'/>
                        </div>

                        <div className='main__warehouse-list-information box'>
                        <p className='main__warehouse-label-qty label'> QUANTITY</p>
                        <img className='main__warehouse-image image' src= {sortImg} alt='sort logo'/>
                        </div>

                        <div className='main__warehouse-list-actions box'>
                        <p className='main__warehouse-label-actions label'>ACTIONS</p>
                        </div>

                    </div>

                    {/* this is the end of the tablet and desktop bar that is hidden in mobile */}
      <WarehouseInventory inventory={this.state.inventoryItems}/>
    </div>
  );
};
}

export default WarehouseDetails;
