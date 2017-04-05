const Sequelize = require('sequelize')
const config = require('../../config/config.json')
const DB_config = config[process.env.MODE_RUN]

module.exports.sequelize = new Sequelize(DB_config.database, 
                                DB_config.user,
                                DB_config.password, 
        //Options
        {
        dialect: DB_config.BD,
        host: DB_config.host,
        port:    DB_config.port, 
        logging: DB_config.logging=="true" 
});