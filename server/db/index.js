const Sequelize = require('sequelize')
const config = require('../../config/config.json')
const DB_config = config[process.env.MODE_RUN]

module.exports.sequelize = new Sequelize(process.env.DB_NAME || DB_config.database, 
                                process.env.DB_USER || DB_config.user,
                                process.env.DB_PASSWORD || DB_config.password, 
        //Options
        {
        dialect: process.env.DB_SERVER || DB_config.BD,
        host: process.env.DB_HOST || DB_config.host,
        port:   process.env.DB_PORT || DB_config.port, 
        logging: process.env.DB_LOG || DB_config.log=="true" 
});