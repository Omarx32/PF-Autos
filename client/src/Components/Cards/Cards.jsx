import { useSelector } from "react-redux"
import Card from "./Card/Card"
import './styles.css'

const CardsContainer = () => {
 const cars = useSelector((state)=> state.cars)



    return(
        <div className='cards'>
            {cars?.map ((car)=>(
                <Card
                key={car.id}
                id={car.id}
                image={car.image}
                name={car.name}
                
                />
            ))}
            
        </div>
    )
}

export default CardsContainer