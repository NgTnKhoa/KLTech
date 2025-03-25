chmod 644 /etc/mysql/my.cnf

mysql --user=root --password=123467890@123 <<-EOSQL
    CREATE USER 'replica'@'%' IDENTIFIED WITH caching_sha2_password BY '1234567890@123';
    GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
    FLUSH PRIVILEGES;
EOSQL
