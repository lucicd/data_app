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
    username character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    role character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE users
    OWNER to postgres;

INSERT INTO users(username, email, role) VALUES('Tom Prewett', 'Tom.Prewett@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Mckinley Mccaslin', 'Mckinley.Mccaslin@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Janella Giesen', 'Janella.Giesen@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Sharolyn Shuttleworth', 'Sharolyn.Shuttleworth@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Lashanda Loehr', 'Lashanda.Loehr@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Ernesto Rominger', 'Ernesto.Rominger@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Sindy Steuck', 'Sindy.Steuck@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Pasquale Heuer', 'Pasquale.Heuer@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Eve Armentrout', 'Eve.Armentrout@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Machelle Clegg', 'Machelle.Clegg@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Marilou Jacquet', 'Marilou.Jacquet@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Eldon Alers', 'Eldon.Alers@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Illa Akana', 'Illa.Akana@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Trent Zerangue', 'Trent.Zerangue@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Danyelle Zuchowski', 'Danyelle.Zuchowski@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Osvaldo Lindo', 'Osvaldo.Lindo@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Curtis Bruneau', 'Curtis.Bruneau@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Davis Peery', 'Davis.Peery@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Bell Piggott', 'Bell.Piggott@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Constance Weingart', 'Constance.Weingart@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Kallie Wingard', 'Kallie.Wingard@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Elaine Mcintire', 'Elaine.Mcintire@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Pricilla Kulick', 'Pricilla.Kulick@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('David Kriner', 'David.Kriner@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Jerri Rank', 'Jerri.Rank@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Cleora Anastasio', 'Cleora.Anastasio@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Bernetta Dehaan', 'Bernetta.Dehaan@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Shanelle Wesolowski', 'Shanelle.Wesolowski@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Nannie Delossantos', 'Nannie.Delossantos@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Joycelyn Eastin', 'Joycelyn.Eastin@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Inocencia Cohan', 'Inocencia.Cohan@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Tennille Crandle', 'Tennille.Crandle@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Sandy Pablo', 'Sandy.Pablo@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Alane Grullon', 'Alane.Grullon@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Neida Contos', 'Neida.Contos@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Vernie Kenney', 'Vernie.Kenney@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Willette Almquist', 'Willette.Almquist@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Donetta Gresham', 'Donetta.Gresham@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Allie Lennon', 'Allie.Lennon@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Cheyenne Drane', 'Cheyenne.Drane@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Louanne Redrick', 'Louanne.Redrick@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Hal Sanborn', 'Hal.Sanborn@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Elke Reichel', 'Elke.Reichel@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Milo Melillo', 'Milo.Melillo@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Eleanore Troxell', 'Eleanore.Troxell@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Cathie Hennig', 'Cathie.Hennig@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Terrance Ebinger', 'Terrance.Ebinger@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Brandee Booker', 'Brandee.Booker@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Kizzie Wolverton', 'Kizzie.Wolverton@gmail.com', 'user');
INSERT INTO users(username, email, role) VALUES('Beata Ledwell', 'Beata.Ledwell@gmail.com', 'user');