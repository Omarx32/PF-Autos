import './styles.css'
const Card  = ({title, image}) => {

    return (
        <div className='card'>
            <div className='card-details'>
                <img src={image} alt={title}></img>
                <h1 className='title'>{title}</h1>
                <button className='btn'>Ingresar</button>
            </div>
            
        </div>
    )
}

export default Card