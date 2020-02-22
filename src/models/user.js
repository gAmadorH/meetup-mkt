const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    paranoid: true,
    setterMethods: {
      password(val) {
        const password = bcrypt.hashSync(val, bcrypt.genSaltSync(8))
        this.setDataValue('password', password)
      }
    }
  })

  User.associate = (models) => {
    User.belongsToMany(models.Meeting, { through: models.MeetingUsers })
    User.hasMany(models.Meeting, { foreignKey: 'hostId' })
  }

  User.prototype.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}
