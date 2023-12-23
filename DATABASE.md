-- revou_project.ROLES definition

CREATE TABLE "ROLES" (
  "ROLE_ID" bigint NOT NULL AUTO_INCREMENT,
  "ROLE_NAME" varchar(50) DEFAULT NULL,
  PRIMARY KEY ("ROLE_ID"),
  UNIQUE KEY "ROLES_UN" ("ROLE_NAME")
);

-- revou_project.USERS definition

CREATE TABLE "USERS" (
  "USER_ID" bigint NOT NULL AUTO_INCREMENT,
  "USER_EMAIL" varchar(50) NOT NULL,
  "USER_PASS" varchar(100) NOT NULL,
  "ROLE_ID" bigint NOT NULL,
  "USER_VERIFIED" binary(1) NOT NULL,
  PRIMARY KEY ("USER_ID"),
  UNIQUE KEY "USERS_UN" ("USER_EMAIL"),
  KEY "user_role_id_foreign" ("ROLE_ID"),
  CONSTRAINT "user_role_id_foreign" FOREIGN KEY ("ROLE_ID") REFERENCES "ROLES" ("ROLE_ID")
);

-- revou_project.DISASTERS definition

CREATE TABLE "DISASTERS" (
  "DIS_ID" bigint NOT NULL AUTO_INCREMENT,
  "USER_ID" bigint NOT NULL,
  "DIS_TITLE" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "DIS_ADDRESS" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "DIS_TIME" timestamp NOT NULL,
  "DIS_DESCRIPTION" varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "DIS_IMAGE" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "DIS_DONATION" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DIS_LONGITUDE" float DEFAULT NULL,
  "DIS_LATITUDE" float DEFAULT NULL,
  "DIS_PROVINCE" varchar(100) DEFAULT NULL,
  PRIMARY KEY ("DIS_ID"),
  KEY "bencana_user_id_foreign" ("USER_ID"),
  CONSTRAINT "bencana_user_id_foreign" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID")
);

-- revou_project.DOCTORS definition

CREATE TABLE "DOCTORS" (
  "DOK_ID" bigint NOT NULL AUTO_INCREMENT,
  "USER_ID" bigint NOT NULL,
  "DOK_NAME" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "DOK_SPEC" varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DOK_EMAIL" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DOK_TELP" varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DOK_BIO" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DOK_NOSTR" varchar(64) DEFAULT NULL,
  "DOK_LOCATION" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  "DOK_EXP" varchar(128) DEFAULT NULL,
  "DOK_STATUS" tinyint(1) NOT NULL,
  PRIMARY KEY ("DOK_ID"),
  KEY "dokter_user_id_foreign" ("USER_ID"),
  CONSTRAINT "dokter_user_id_foreign" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID")
);

-- revou_project.INFORMER definition

CREATE TABLE "INFORMER" (
  "INF_ID" bigint NOT NULL AUTO_INCREMENT,
  "USER_ID" bigint NOT NULL,
  "INF_NAME" varchar(255) NOT NULL,
  "INF_NIK" varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  "INF_TELP" varchar(255) NOT NULL,
  PRIMARY KEY ("INF_ID"),
  UNIQUE KEY "VOLUNTEERS_UN" ("INF_NIK"),
  KEY "relawan_user_id_foreign" ("USER_ID"),
  CONSTRAINT "relawan_user_id_foreign" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID")
);

-- revou_project.POLYCLINICS definition

CREATE TABLE "POLYCLINICS" (
  "POLI_ID" bigint NOT NULL AUTO_INCREMENT,
  "USER_ID" bigint NOT NULL,
  "POLI_NAME" varchar(50) NOT NULL,
  PRIMARY KEY ("POLI_ID"),
  KEY "poli_user_id_foreign" ("USER_ID"),
  CONSTRAINT "poli_user_id_foreign" FOREIGN KEY ("USER_ID") REFERENCES "USERS" ("USER_ID")
);


