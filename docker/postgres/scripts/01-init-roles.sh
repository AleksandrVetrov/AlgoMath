set -e

psql -v ON_ERROR_STOP=1 --d "$POSTGRES_DB" --username "$POSTGRES_USER" <<-EOSQL
    INSERT INTO roles(name) VALUES('ROLE_USER');
    INSERT INTO roles(name) VALUES('ROLE_ADMIN');
EOSQL