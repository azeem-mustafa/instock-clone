import React from "react";
import './_warehousesList.scss';
import BinPic from '../../assets/icons/delete_outline-24px.svg';
import PencilPic from '../../assets/icons/edit-24px.svg';
import chevronRight from '../../assets/icons/chevron_right-24px.svg';
import { Link } from 'react-router-dom';


function ListedWarehouses (props) {
    return (
        <section className='warehouses'>
        
            {props.warehouse.map((list) => {
                console.log(props.warehouse.map);
                return(
                    <div key={list.id} className='warehouses__box'>
                        
                    <div className='warehouses__flex'>

                        <aside className='warehouses__detail-flex'>

                            <div className='warehouses__location'>
                                <p className='warehouses__location-label'>WAREHOUSE</p>
                                <Link to={`/${list.id}`}>
                                <div className='warehouses__location-link-box'>
                                    <p className='warehouses__location-link'>{list.name}</p>
                                    <img src={chevronRight} alt='chevron image' />
                                </div></Link>
                            </div>

                            <div className='warehouses__address'>
                                <p className='warehouses__address-label'>ADDRESS</p>
                                <p className='warehouses__address-info'>{list.address}</p>
                            </div>
                            
                        </aside>

                        <aside className='warehouses__contact-flex'>

                            <div className='warehouses__contact'>
                                <p className='warehouses__contact-label'>CONTACT NAME</p>
                                <p className='warehouses__contact-name'>{list.contact.name}</p>
                            </div>

                            <div className='warehouses__contact-info'>
                                <p className='warehouses__contact-info-label'>CONTACT INFORMATION</p>
                                <p className='warehouses__contact-info-number'>{list.contact.phone}</p>
                                <p className='warehouses__contact-info-email'>{list.contact.email}</p>
                            </div>

                        </aside>
                
                        <div className='warehouses__images-non-mobile'>
                        <img onClick={() => props.handleDelete(list.id, list.name)} src={BinPic} alt='delete icon' />
                        <Link to={`/${list.id}/edit`}><img className='warehouses__images-non-mobile-pen' src={PencilPic} alt='edit icon' /></Link>
                    </div>
                    </div>

                    <div className='warehouses__images'>
                    <img onClick={() => props.handleDelete(list.id, list.name)} src={BinPic} alt='delete icon' />
                    <Link to={`/${list.id}/edit`}><img src={PencilPic} alt='edit icon' /></Link>
                    </div>
                    </div>
                )
})}
                </section>
    )
}

export default ListedWarehouses