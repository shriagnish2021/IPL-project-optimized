const dropTableDeliveriesQuery = `DROP TABLE IF EXISTS deliveries CASCADE`;
const createDeliveriesTableQuery = `CREATE TABLE IF NOT EXISTS deliveries (
    match_id INT NOT NULL,
    inning SMALLINT NOT NULL,
    batting_team varchar(50) NOT NULL,
    bowling_team varchar(50) NOT NULL,
    over SMALLINT NOT NULL,
    ball SMALLINT NOT NULL,
    batsman varchar(100) NOT NULL,
    non_striker varchar(100) NOT NULL,
    bowler varchar(100) NOT NULL,
    is_super_over SMALLINT NOT NULL,
    wide_runs SMALLINT NOT NULL,
    bye_runs SMALLINT NOT NULL,
    legbye_runs SMALLINT NOT NULL,
    noball_runs SMALLINT NOT NULL,
    penalty_runs SMALLINT NOT NULL,
    batsman_runs SMALLINT NOT NULL,
    extra_runs SMALLINT NOT NULL,
    total_runs SMALLINT NOT NULL,
    player_dismissed varchar(100),
    dismissal_kind VARCHAR(50),
    fielder varchar(100)
)`;
module.exports = { dropTableDeliveriesQuery, createDeliveriesTableQuery };
