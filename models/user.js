'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    async checkPassword(plainPassword){
      return await bcrypt.compare(plainPassword, this.password)
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Reservation, { foreignKey: 'UserId' })
      User.hasOne(models.Profile, { foreignKey: 'UserId' })
    }

    static async userName (id){
      let user = await User.findAll({
        where:{
          id : id
        }
      })
      console.log(user)
      return user[0].dataValues.username
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has been taken"
      },
      validate: {
        notNull: {
          msg: "Email cannot be empty"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Must insert an email address"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg:"Username has been taken"
      },
      validate: {
        notNull: {
          msg: "Username cannot be empty"
        },
        notEmpty: {
          msg: "Username cannot be empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        },
        min:{
          args:8,
          msg: "Password minimum length is 8"
        }
      }
    },
    role:{
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash

    user.role = "user"
  })
  User.afterCreate((user, option) => {
    // console.log(user)
    delete user.dataValues.password;
    delete user.dataValues.email;
    delete user.dataValues.id;
    delete user.dataValues.updatedAt;
    delete user.dataValues.createdAt;
    delete user.dataValues.role;
  })
  return User;
};