const validationInputs = (input) => {
    let errors = {};
  
    // Validacion de Name 
    let regexNumbers = new RegExp("[0-9]"); 
    if(!input.name) errors.name = "You must enter a pokemon name";
    if(input.name.length > 12) errors.name = "The name cannot have more than 12 letters";
    if(regexNumbers.test(input.name)) errors.name= "The name must not contain numbers";
  
    // Validacion de Image 
    let regexImage = /^(http|https):\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif)$/;
    if(!regexImage.test(input.image)) errors.image = "The URL must start with http or https"; //"The URL must start with http or https and end with .jpg, .jpeg, .png or .gif";
    if(!input.image) errors.image = "You must enter an image url";
  
    // Validacion de HP 
    if(!input.hp) errors.hp = "You must enter a HP value";
    if(input.hp < 1) errors.hp = "The value has to be greater than 0";
    if(input.hp > 999) errors.hp = "The value cannot be greater than 999";

    // Validacion de Attack 
    if(!input.attack) errors.attack = "You must enter an attack value";
    if(input.attack < 0) errors.attack = "The value has to be greater than 0";
    if(input.attack > 999) errors.attack = "The value cannot be greater than 999";
  
    // Validacion de Defense
    if(!input.defense) errors.defense = "You must enter an defense value";
    if(input.defense < 0) errors.defense = "The value has to be greater than 0";
    if(input.defense > 999) errors.defense = "The value cannot be greater than 999";

    // Validacion de Speed
    if(input.speed < 0) errors.speed = "The value has to be greater than 0";
    if(input.speed > 999) errors.speed = "The value cannot be greater than 999";

    // Validacion de Height
    if(input.height < 0) errors.height = "The value has to be greater than 0";
    if(input.height > 999) errors.height = "The value cannot be greater than 999";

    // Validacion de Weight
    if(input.weight < 0) errors.weight = "The value has to be greater than 0";
    if(input.weight > 999) errors.weight = "The value cannot be greater than 999";

    // Validacion de Types 
    if(input.types.length === 0) errors.types = "You must choose at least 1 type";
    if(input.types.length > 2) errors.types = "You must choose a maximum of 2 types";

    return errors;
  };
  
  export default validationInputs;