'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      },
      allowNull: false,
    },
    isCompleted: DataTypes.BOOLEAN
  }, {});
  TodoItem.associate = function(models) {
    // associations can be defined here
  };
  return TodoItem;
};