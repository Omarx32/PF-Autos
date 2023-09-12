// {
//   "name": "client",
//   "private": true,
//   "version": "0.0.0",
//   "type": "commonjs",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "axios": "^0.21.4"
//     "bootstrap": "^5.1.0"
//     "gapi-script": "^1.0.0"
//     "react": "^17.0.2"
//     "react-bootstrap": "^2.0.0-beta.6"
//     "react-dom": "^17.0.2"
//     "react-google-login": "^5.2.2"
//     "react-icons": "^4.3.1"
//     "react-redux": "^7.2.5"
//     "react-router": "^5.3.0"
//     "react-router-dom": "^5.3.0"
//     "redux": "^4.1.1"
//     "redux-devtools-extension": "^2.13.9"
//     "redux-thunk": "^2.4.1"
//     "web-vitals": "^2.1.2"

//   },
//   "devDependencies": {
//     "@types/react": "^17.0.21"
//     "@types/react-dom": "^17.0.9"
//     "@vitejs/plugin-react-swc": "^1.0.0-beta.6"
//     "autoprefixer": "^10.3.1"
//     "eslint": "^8.0.1"
//     "eslint-plugin-react": "^7.26.1"
//     "eslint-plugin-react-hooks": "^4.3.0"
//     "eslint-plugin-react-refresh": "^3.1.0"
//     "tailwindcss": "^2.2.19"
//     "vite": "^2.6.4"
//   }
// }

// ACTION
export const addFav=(car)=>{
    return {
        type:ADD_FAV,
        payload: car
    }
  };
  
  export const removeFav=(id)=>{
    return {
        type:REMOVE_FAV,
        payload:id
    }
  };

//   REDUCER

// favorites:[] 

// case ADD_FAV:
//     return {
//       ...state, 
//       favorites:[...state.favorites, action.payload]
//     };
//   case REMOVE_FAV:
//     const arrFav= state.favorites.filter((fav)=> fav.id !== action.payload);
//     return {
//       ...state, favorites:arrFav
//     }

// CARD
const dispatch=useDispatch()

const favorites= useSelector((state)=> state.favorites)

const [isFav, setIsFav]=useState(false);

const handleFavorite=()=>{
    if(isFav===true){
        setIsFav(false);
        dispatch(removeFav(id));
    } else{
        setIsFav(true);
        dispatch(addFav({id, image, name, addFav, removeFav}))
    }
}

useEffect(() => {
    for (let i = 0; i < favorites.length; i++) {
        if(favorites[i].id===id){
            setIsFav(true);
        }
    }
 }, [favorites]);

 <button>{isFav ? "❤️" : "🤍"}</button>

//  FAVORITES

import React from 'react'
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