const validationCreate = (errors, input) => {
    let errExists = false;

    (input.speed === "" || input.speed >= 0) &&
    (input.height === "" || input.height >= 0) &&
    (input.weight === "" || input.weight >= 0) &&
    errors.name === undefined &&
    errors.image === undefined &&
    errors.hp === undefined &&
    errors.attack === undefined &&
    errors.defense === undefined &&
    errors.speed === undefined  &&
    errors.height === undefined  &&
    errors.weight === undefined &&
    errors.types === undefined
    ?
    errExists = false
    :
    errExists = true;

    return errExists;
};

export default validationCreate;