import { useSelector } from 'react-redux'
import Card from './Cards/Card/Card'

const Favorites = () => {
    const favorites= useSelector((state)=> state.favorites)

  return (
    <div>
        {
            favorites.map((fav)=>{
                return <Card
                        key={fav.id}
                        id={fav.id}
                        image={fav.image}
                        name={fav.name}
                        />
            })
        }
        </div>
  )
}

export default Favorites;