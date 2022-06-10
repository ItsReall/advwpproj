const Sequelize = require('sequelize');

class Contest extends Sequelize.Model {
  static init(sequelize) {
    const contestAttr = {
      contest_name: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      con_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      con_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      field: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      contest_host: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    };

    const contestTbl = {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Contest',
      tableName: 'contests',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    };

    return super.init(contestAttr, contestTbl);
  }

  static associate(db) {
    db.Contest.belongsTo(db.User);
  }
}

module.exports = Contest;
