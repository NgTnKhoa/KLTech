create table if not exists users
(
    id           char(36),
    role         varchar(50)  not null,
    name         varchar(255) not null,
    email        varchar(255) not null unique,
    username     varchar(15)  not null unique,
    password     varchar(255) not null,
    phone_number varchar(10)  not null unique,
    entry_by      char(36)     null,
    entry_date    datetime default current_timestamp,
    updated_by    char(36)     null,
    updated_date  datetime default current_timestamp on update current_timestamp,

    primary key (id)
);

CREATE INDEX idx_users ON users (name, username, email);

create table if not exists tokens
(
    id         char(36),
    user_id    char(36)     not null,
    token      varchar(255) not null,
    token_type varchar(10)  not null,
    expired    boolean      not null,
    revoked    boolean      not null,

    primary key (id),
    foreign key (user_id) references users (id)
);
