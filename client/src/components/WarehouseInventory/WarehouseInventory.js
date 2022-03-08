import React from "react";
import './_warehouseInventory.scss';
import BinPic from '../../assets/icons/delete_outline-24px.svg';
import PencilPic from '../../assets/icons/edit-24px.svg';
import chevronRight from '../../assets/icons/chevron_right-24px.svg';
import {Link} from 'react-router-dom';

function WarehouseInventory (props) {
    return (
        <section className='inventory'>
        
            {props.inventory.map((list) => {
                console.log(props.inventory.map);
                return(
                    <div key={list.id} className='inventory__box'>
                        
                    <div className='inventory__flex'>

                        <aside className='inventory__detail-flex'>

                            <div className='inventory__location'>
                                <p className='inventory__location-label'>INVENTORY ITEM</p>
                                <Link to={`/inventory/${list.id}`}> <div className='inventory__location-link-box'>
                                    <p className='inventory__location-link'>{list.itemName}</p>
                                    <img src={chevronRight} alt='chevron image' />
                                </div></Link>
                            </div>

                            <div className='inventory__address'>
                                <p className='inventory__address-label'>CATEGORY</p>
                                <p className='inventory__address-info'>{list.category}</p>
                            </div>
                            
                        </aside>

                        <aside className='inventory__contact-flex'>

                            <div className='inventory__contact'>
                                <p className='inventory__contact-label'>STATUS</p>
                                <p className='inventory__contact-name'>{list.status}</p>
                            </div>

                            <div className='inventory__contact-info'>
                                <p className='inventory__contact-info-label'>QTY</p>
                                <p className='inventory__contact-info-number'>{list.quantity}</p>
                            </div>

                        </aside>
                        <div className='inventory__images-non-mobile'>
                        <img src={BinPic} alt='delete icon' />
                        <Link to={`/inventory/${list.id}/edit`}><img className='inventory__images-non-mobile-pen' src={PencilPic} alt='edit icon' /></Link>
                    </div>
                    </div>

                    <div className='inventory__images'>
                        <img src={BinPic} alt='delete icon' />
                        <Link to={`/inventory/${list.id}/edit`}><img src={PencilPic} alt='edit icon' /></Link>
                    </div>
                    </div>
                )
})}
                </section>
    )
}

export default WarehouseInventory