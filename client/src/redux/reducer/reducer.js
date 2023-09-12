import { all } from "axios";
import {
  ADD_FAV,
  FILTER_BRANDS,
  FILTER_CATEGORY,
  GET_BRANDS,
  GET_CARS,
  GET_CATEGORYS,
  GET_DETAIL,
  ON_SEARCH,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  REMOVE_FAV,
} from "../action/typeAction";
let initialState = {
  allVehiculos: [],
  allCars: [],
  cars: [],
  carsDetail: {},
  onSearch: {},
  category: [],
  brands: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        allVehiculos: action.payload,
        allCars: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        carsDetail: action.payload,
      };

    case FILTER_CATEGORY:
      let filtro = [];
      if (action.payload === "default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }
      filtro = state.allCars.filter(
        (car) =>
          car.Categories && // Verifica si 'Categories' está definido
          car.Categories.Product_Category && // Verifica si 'Product_Category' está definido
          car.Categories.Product_Category.CategoryName && // Verifica si 'CategoryName' está definido
          car.Categories.Product_Category.CategoryName.includes(action.payload)
      );
      console.log("estado", state.allCars);
      return { ...state, cars: filtro };

    case ORDER_BY_NAME:
      if (action.payload === "Default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }

    case FILTER_BRANDS:
      let filter = [];
      if (action.payload === "default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }
      filter = state.allCars.filter((car) =>
        car.brand.includes(action.payload)
      );

      return { ...state, cars: filter };
    case ORDER_BY_NAME:
      if (action.payload === "Default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }

      const sortedName =
        action.payload === "A-Z"
          ? state.cars.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.cars.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
            });
      return {
        ...state,
        cars: sortedName,
      };

    case ORDER_BY_PRICE:
      if (action.payload === "Default") {
        return {
          ...state,
          cars: state.allCars,
        };
      }

      const sortedPrice =
        action.payload === "min_price"
          ? [...state.cars].sort(
              (a, b) => parseInt(a.price) - parseInt(b.price)
            )
          : [...state.cars].sort(
              (a, b) => parseInt(b.price) - parseInt(a.price)
            );
      console.log(sortedPrice);

      return {
        ...state,
        cars: sortedPrice,
      };
    case ON_SEARCH:
      return {
        ...state,
        onSearch: action.payload,
      };
    case GET_CATEGORYS:
      return {
        ...state,
        category: action.payload,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
