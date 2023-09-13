import { useSelector } from 'react-redux'
import Card from '../Cards/Card/Card'
import style from './Favorites.module.css'

const Favorites = () => {
    const favorites= useSelector((state)=> state.favorites)

  return (
    <div>
      <h1 className={style.h1}>Tus carros de preferencia</h1>
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