module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    number: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    reference: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  })

  Location.associate = (models) => {
    Location.belongsTo(models.Meeting, { foreignKey: 'meetingId' })
  }

  return Location
}
