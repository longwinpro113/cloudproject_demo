<?php
// Define PostgreSQL database server connect parameters.
define('PG_HOST', 'ec2-54-157-88-70.compute-1.amazonaws.com');
define('PG_PORT', 5432);
define('PG_DATABASE', 'd8jdgflt4iko96');
define('PG_USER', 'dgkkedxeusqfsw');
define('PG_PASSWORD', '9de57c8b5347851209758919a463f3ba5a58dd8af2ef5d90f04c6c1aef6c1a06');
define('ERROR_ON_CONNECT_FAILED', 'Connection failed!');

// Merge connect string and connect db server with default parameters.
function getDB() {
    return pg_pconnect (' host=' . PG_HOST .
                        ' port=' . PG_PORT .
                        ' dbname=' . PG_DATABASE .
                        ' user=' . PG_USER .
                        ' password=' . PG_PASSWORD
                       ) or die (ERROR_ON_CONNECT_FAILED);
}
?>