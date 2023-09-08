import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getBrands } from "../../redux/action/action";

const FilterBrands = ({handleBrands, filterBrands}) => {
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getBrands());
    }, [dispatch])

    const brands=useSelector((state)=> state.brands)
  return (
    <form onSubmit={filterBrands}>
        <select onChange={handleBrands}>
             <option value="">default</option>
            {
                brands.map((brand)=> <option value={brand}>{brand}</option> )
            }
        </select>
        <button type="submit">Filtrar</button>
    </form>
  )
}

export default FilterBrands