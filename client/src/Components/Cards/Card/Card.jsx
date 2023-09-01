import './styles.css'
import {NavLink} from 'react-router-dom'


const Card  = (props) => {

    return (
        <div className='card'>
            <div className='card-details'>
            <NavLink to={`/detail/${props.id}`}><img src={props.image} alt={props.name}></img></NavLink>  
                <h1 className='title'>{props.name}</h1>
              
            </div>
            
        </div>
    )
}

export default Card