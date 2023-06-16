create table "confirmation_token"
(
    token_id           int8 not null,
    confirmation_token varchar(255),
    created_date       timestamp,
    user_id            int8 not null,
    primary key (token_id)
);
create table "files"
(
    id   varchar(255) not null,
    data oid,
    name varchar(255),
    type varchar(255),
    primary key (id)
);
create table "post_attachments"
(
    id        bigserial    not null,
    file_name varchar(255) not null,
    file_size int8         not null,
    url       varchar(255) not null,
    post_id   int8,
    primary key (id)
);
create table "posts"
(
    id      int8         not null,
    content varchar(255) not null,
    title   varchar(255) not null,
    user_id int8         not null,
    primary key (id)
);
create table "refreshtoken"
(
    id          int8         not null,
    expiry_date timestamp    not null,
    token       varchar(255) not null,
    user_id     int8,
    primary key (id)
);
create table "roles"
(
    id   serial not null,
    name varchar(20),
    primary key (id)
);
create table "user_roles"
(
    user_id int8 not null,
    role_id int4 not null,
    primary key (user_id, role_id)
);
create table "users"
(
    id         bigserial not null,
    email      varchar(50),
    is_enabled boolean   not null,
    password   varchar(120),
    username   varchar(20),
    primary key (id)
);
alter table "refreshtoken"
    add constraint UK_or156wbneyk8noo4jstv55ii3 unique (token);
alter table "users"
    add constraint UKr43af9ap4edm43mmtq01oddj6 unique (username);
alter table "users"
    add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);
alter table "confirmation_token"
    add constraint FKah4p1rycwibwm6s9bsyeckq51 foreign key (user_id) references users;
alter table "post_attachments"
    add constraint FKdwocy2l1nlf11ebpfrax6sto1 foreign key (post_id) references posts;
alter table "posts"
    add constraint FK5lidm6cqbc7u4xhqpxm898qme foreign key (user_id) references users;
alter table "refreshtoken"
    add constraint FKa652xrdji49m4isx38pp4p80p foreign key (user_id) references users;
alter table "user_roles"
    add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 foreign key (role_id) references roles;
alter table "user_roles"
    add constraint FKhfh9dx7w3ubf1co1vdev94g3f foreign key (user_id) references users;

INSERT INTO "roles"(name)
VALUES ('ROLE_USER');
INSERT INTO "roles"(name)
VALUES ('ROLE_ADMIN');