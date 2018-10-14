-- SEQUENCE: users_id_seq

-- DROP SEQUENCE users_id_seq;

CREATE SEQUENCE users_id_seq;

ALTER SEQUENCE users_id_seq
    OWNER TO postgres;

-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE users
    OWNER to postgres;

CREATE UNIQUE INDEX user_username_uidx ON users (LOWER(username));
CREATE UNIQUE INDEX user_email_uidx ON users (LOWER(email));

INSERT INTO users(username, password, email, role) VALUES('Tom Prewett', 'secret', 'Tom.Prewett@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Mckinley Mccaslin', 'secret', 'Mckinley.Mccaslin@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Janella Giesen', 'secret', 'Janella.Giesen@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Sharolyn Shuttleworth', 'secret', 'Sharolyn.Shuttleworth@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Lashanda Loehr', 'secret', 'Lashanda.Loehr@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Ernesto Rominger', 'secret', 'Ernesto.Rominger@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Sindy Steuck', 'secret', 'Sindy.Steuck@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Pasquale Heuer', 'secret', 'Pasquale.Heuer@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Eve Armentrout', 'secret', 'Eve.Armentrout@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Machelle Clegg', 'secret', 'Machelle.Clegg@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Marilou Jacquet', 'secret', 'Marilou.Jacquet@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Eldon Alers', 'secret', 'Eldon.Alers@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Illa Akana', 'secret', 'Illa.Akana@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Trent Zerangue', 'secret', 'Trent.Zerangue@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Danyelle Zuchowski', 'secret', 'Danyelle.Zuchowski@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Osvaldo Lindo', 'secret', 'Osvaldo.Lindo@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Curtis Bruneau', 'secret', 'Curtis.Bruneau@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Davis Peery', 'secret', 'Davis.Peery@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Bell Piggott', 'secret', 'Bell.Piggott@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Constance Weingart', 'secret', 'Constance.Weingart@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Kallie Wingard', 'secret', 'Kallie.Wingard@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Elaine Mcintire', 'secret', 'Elaine.Mcintire@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Pricilla Kulick', 'secret', 'Pricilla.Kulick@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('David Kriner', 'secret', 'David.Kriner@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Jerri Rank', 'secret', 'Jerri.Rank@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Cleora Anastasio', 'secret', 'Cleora.Anastasio@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Bernetta Dehaan', 'secret', 'Bernetta.Dehaan@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Shanelle Wesolowski', 'secret', 'Shanelle.Wesolowski@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Nannie Delossantos', 'secret', 'Nannie.Delossantos@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Joycelyn Eastin', 'secret', 'Joycelyn.Eastin@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Inocencia Cohan', 'secret', 'Inocencia.Cohan@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Tennille Crandle', 'secret', 'Tennille.Crandle@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Sandy Pablo', 'secret', 'Sandy.Pablo@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Alane Grullon', 'secret', 'Alane.Grullon@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Neida Contos', 'secret', 'Neida.Contos@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Vernie Kenney', 'secret', 'Vernie.Kenney@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Willette Almquist', 'secret', 'Willette.Almquist@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Donetta Gresham', 'secret', 'Donetta.Gresham@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Allie Lennon', 'secret', 'Allie.Lennon@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Cheyenne Drane', 'secret', 'Cheyenne.Drane@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Louanne Redrick', 'secret', 'Louanne.Redrick@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Hal Sanborn', 'secret', 'Hal.Sanborn@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Elke Reichel', 'secret', 'Elke.Reichel@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Milo Melillo', 'secret', 'Milo.Melillo@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Eleanore Troxell', 'secret', 'Eleanore.Troxell@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Cathie Hennig', 'secret', 'Cathie.Hennig@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Terrance Ebinger', 'secret', 'Terrance.Ebinger@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Brandee Booker', 'secret', 'Brandee.Booker@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Kizzie Wolverton', 'secret', 'Kizzie.Wolverton@gmail.com', 'user');
INSERT INTO users(username, password, email, role) VALUES('Beata Ledwell', 'secret', 'Beata.Ledwell@gmail.com', 'user');