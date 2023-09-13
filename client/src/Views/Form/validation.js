const regexName = /^[a-zA-Z\s]+$/;
const regexNumber = /^[0-9]\d*(\.\d+)?$/;

const errorCompleted = "is required";
const errorJustNumber = "It must be just numbers";

const validation = ({
    name,
    brand,
    description,
    price,
    stock,
    maker,
    model,
    color,
    kilometraje,
    direccion,
    category

}) => {
    const errors = {};
    if (!name) {
        errors.name = `Name ${errorCompleted}`;
      } else if (parseInt(name)) {
        errors.name = "Name is invalid, write a text";
      } else if (!regexName.test(name)) {
        errors.name = "Special caracters aren't supported";
      } else if (name.length > 51) {
        errors.name = "Name must have a maximum of 50 characters";
      }
      if (!brand) {
        errors.brand = `Brand ${errorCompleted}`;
    }

    if (!description) {
        errors.description = `Description ${errorCompleted}`;
    }
      if (!price) {
        errors.price = `Price ${errorCompleted}`;
    } else if (!regexNumber.test(price)) {
        errors.price = `Price ${errorJustNumber}`;
    }

    if (!stock) {
        errors.stock = `Stock ${errorCompleted}`;
    } else if (!Number.isInteger(Number(stock))) {
        errors.stock = `Stock must be an integer`;
    }
    if (!maker) {
        errors.maker = `Maker ${errorCompleted}`;
    }

    if (!model) {
        errors.model = `Model ${errorCompleted}`;
    } else if (!Number.isInteger(Number(model))) {
        errors.model = `Model must be an integer`;
    }

    if (!color) {
        errors.color = `Color ${errorCompleted}`;
    }

    if (!kilometraje) {
        errors.kilometraje = `Kilometraje ${errorCompleted}`;
    } else if (!Number.isInteger(Number(kilometraje))) {
        errors.kilometraje = `Kilometraje must be an integer`;
    }

    if (!direccion) {
        errors.direccion = `Direccion ${errorCompleted}`;
    }

    if (!category) {
        errors.category = `Category ${errorCompleted}`;
    }
    
    return errors;
}
export default validation;