const { Pool } = require('pg');
const { readFile } = require('./utility');
const { DELIVERIES_FILE_PATH, CONFIG_CREDENTIALS } = require('./constants');
const { dropTableDeliveriesQuery, createDeliveriesTableQuery } = require('./queries');

const pool = new Pool(CONFIG_CREDENTIALS);

async function run() {
    const start = Date.now();
    const deliveries = await readFile(DELIVERIES_FILE_PATH);

    const client = await pool.connect();
    await client.query('BEGIN');
    await client.query(dropTableDeliveriesQuery);
    await client.query(createDeliveriesTableQuery);
    let insertIntoDeliveriesQuery = `INSERT INTO deliveries VALUES`;
    let count = 0;
    for (const delivery of deliveries) {
        count += 1;
        insertIntoDeliveriesQuery += `(${parseInt(delivery.match_id)},
            ${parseInt(delivery.inning)},
            '${delivery.batting_team}',
            '${delivery.bowling_team}',
            ${parseInt(delivery.over)},
            ${parseInt(delivery.ball)},
            '${delivery.batsman}',
            '${delivery.non_striker}',
            '${delivery.bowler}',
            ${parseInt(delivery.is_super_over)},
            ${parseInt(delivery.wide_runs)},
            ${parseInt(delivery.bye_runs)},
            ${parseInt(delivery.legbye_runs)},
            ${parseInt(delivery.noball_runs)},
            ${parseInt(delivery.penalty_runs)},
            ${parseInt(delivery.batsman_runs)},
            ${parseInt(delivery.extra_runs)},
            ${parseInt(delivery.total_runs)},
            '${delivery.player_dismissed}',
            '${delivery.dismissal_kind}',
            '${delivery.fielder}'),`;
        if (count % 15000 === 0 || count === 150460) {
            await client.query(insertIntoDeliveriesQuery.slice(0, -1));
            insertIntoDeliveriesQuery = `INSERT INTO deliveries VALUES`;
        }
    }
    await client.query('COMMIT');
    client.release();
    const stop = Date.now();
    console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
}
run();
