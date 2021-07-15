const DELIVERIES_FILE_PATH = './data/deliveries.csv';
const CONFIG_CREDENTIALS = {
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'ipl-optimized',
};
module.exports = { DELIVERIES_FILE_PATH, CONFIG_CREDENTIALS };
