-- SEQUENCE: regions_id_seq

-- DROP SEQUENCE regions_id_seq;

CREATE SEQUENCE regions_id_seq;

ALTER SEQUENCE regions_id_seq
    OWNER TO postgres;

-- Table: regions

-- DROP TABLE regions;

CREATE TABLE public.regions
(
    id integer NOT NULL DEFAULT nextval('regions_id_seq'::regclass),
    abbreviation character varying(6) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT regions_pkey PRIMARY KEY (id)
) WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE regions
    OWNER to postgres;

CREATE UNIQUE INDEX region_abbreviation_uidx ON regions (LOWER(abbreviation));
CREATE UNIQUE INDEX region_name_uidx ON regions (LOWER(name));

INSERT INTO regions(abbreviation, name) VALUES('MEA', 'Middle East and Africa');
INSERT INTO regions(abbreviation, name) VALUES('APAC', 'Asia Pacific');
INSERT INTO regions(abbreviation, name) VALUES('EU', 'Europe');
INSERT INTO regions(abbreviation, name) VALUES('NA', 'Noth America');
INSERT INTO regions(abbreviation, name) VALUES('SA', 'South America');
INSERT INTO regions(abbreviation, name) VALUES('IN', 'India');
INSERT INTO regions(abbreviation, name) VALUES('CH', 'China');
INSERT INTO regions(abbreviation, name) VALUES('RU', 'Russia');
