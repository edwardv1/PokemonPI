const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// * const { v4: uuidv4 } = require('uuid');
// * id:${uuidv4()}-${genre.id},
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        //max: 255
      }
    }
  }, { timestamps: false });
};
