const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,     //hjfe43-2574kl-564sdfg-7564f
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl: true,
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      }
    },
  }, { freezeTableName: true, timestamps: false });
};


//DataTypes.UUID: combinacion de nros, letras y guiones (codigo alfanumerico)
//defaultValue: DataTypes.UUIDV4: Algoritmo que crea un nro aleatorio de identificacion

//freezeTableName: true --> forzamos nombreTabla === nombreModelo

//! Son obligatorios 
// ID -> id
// Nombre -> name
// Imagen -> image
// Vida -> hp
// Ataque -> attack
// Defensa -> defense

//! No son obligatorios 
// Velocidad -> speed
// Altura -> height
// Peso -> weight