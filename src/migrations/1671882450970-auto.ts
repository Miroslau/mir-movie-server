import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1671882450970 implements MigrationInterface {
  name = 'auto1671882450970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("ID" SERIAL NOT NULL, "GENRE_NAME" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_683831b8dc66889d27981ac22be" UNIQUE ("GENRE_NAME"), CONSTRAINT "PK_d43f1008e62fc15d30762862a1e" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("ID" SERIAL NOT NULL, "TITLE" character varying NOT NULL, "RELEASE" TIMESTAMP NOT NULL, "RATING" integer NOT NULL, "PLOT" character varying NOT NULL, "MOVIE_LENGTH" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b55ef451fe973da090975202cbc" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("ID" SERIAL NOT NULL, "FIRST_NAME" character varying NOT NULL, "SECOND_NAME" character varying NOT NULL, "BIRTH" TIMESTAMP NOT NULL, "NATIONALITY" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), "movieId" integer, CONSTRAINT "PK_fea3df147245bb65a99453ac6f8" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres_movies_movies" ("genresID" integer NOT NULL, "moviesID" integer NOT NULL, CONSTRAINT "PK_f776ec7e4a05becfecc82484895" PRIMARY KEY ("genresID", "moviesID"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c81e1426340d402afd36dc2f63" ON "genres_movies_movies" ("genresID") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f42511f3979a5310ff0848d063" ON "genres_movies_movies" ("moviesID") `,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_7a04ab3a5d9e7d58913efa0e9f5" FOREIGN KEY ("movieId") REFERENCES "movies"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres_movies_movies" ADD CONSTRAINT "FK_c81e1426340d402afd36dc2f639" FOREIGN KEY ("genresID") REFERENCES "genres"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres_movies_movies" ADD CONSTRAINT "FK_f42511f3979a5310ff0848d0637" FOREIGN KEY ("moviesID") REFERENCES "movies"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "genres_movies_movies" DROP CONSTRAINT "FK_f42511f3979a5310ff0848d0637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres_movies_movies" DROP CONSTRAINT "FK_c81e1426340d402afd36dc2f639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_7a04ab3a5d9e7d58913efa0e9f5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f42511f3979a5310ff0848d063"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c81e1426340d402afd36dc2f63"`,
    );
    await queryRunner.query(`DROP TABLE "genres_movies_movies"`);
    await queryRunner.query(`DROP TABLE "directors"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "genres"`);
  }
}
