import './styles.css'
import { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeFav, addFav } from '../../../redux/action/action';

const Card  = ({id, image, name}) => {
    return (
        <div className='card'>
            <div className='card-details'>
                <NavLink to={`/detail/${id}`}> <img src={image} alt={name}></img> </NavLink>  
                <h1 className='title'>{name}</h1>
            </div>       
        </div>
    )
}

export default Card