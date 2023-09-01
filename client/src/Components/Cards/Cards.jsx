import Card from "../Card/Card"
import './styles.css'
const Cards = ({cars}) => {
    return(
        <div className='cards'>
            {
                cars.map(({title,image}) => {
                    return (
                        <Card
                            title={title}
                            image={image}
                        >

                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Cards