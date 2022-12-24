import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1671883328157 implements MigrationInterface {
    name = 'auto1671883328157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actors" ("ID" SERIAL NOT NULL, "FIRST_NAME" character varying NOT NULL, "SECOND_NAME" character varying NOT NULL, "BIRTH" TIMESTAMP NOT NULL, "NATIONALITY" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bcd0c13ee4af640e3f2656d4a0" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "actors_movies_movies" ("actorsID" integer NOT NULL, "moviesID" integer NOT NULL, CONSTRAINT "PK_085b7fcd93df61b7f815c7a7bf4" PRIMARY KEY ("actorsID", "moviesID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23755a749edf9616f0b5a57459" ON "actors_movies_movies" ("actorsID") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f503d365bb520aa5830598a07" ON "actors_movies_movies" ("moviesID") `);
        await queryRunner.query(`ALTER TABLE "actors_movies_movies" ADD CONSTRAINT "FK_23755a749edf9616f0b5a574593" FOREIGN KEY ("actorsID") REFERENCES "actors"("ID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "actors_movies_movies" ADD CONSTRAINT "FK_2f503d365bb520aa5830598a075" FOREIGN KEY ("moviesID") REFERENCES "movies"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actors_movies_movies" DROP CONSTRAINT "FK_2f503d365bb520aa5830598a075"`);
        await queryRunner.query(`ALTER TABLE "actors_movies_movies" DROP CONSTRAINT "FK_23755a749edf9616f0b5a574593"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f503d365bb520aa5830598a07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23755a749edf9616f0b5a57459"`);
        await queryRunner.query(`DROP TABLE "actors_movies_movies"`);
        await queryRunner.query(`DROP TABLE "actors"`);
    }

}
