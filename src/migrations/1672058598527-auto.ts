import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1672058598527 implements MigrationInterface {
  name = 'auto1672058598527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_7a04ab3a5d9e7d58913efa0e9f5"`,
    );
    await queryRunner.query(
      `CREATE TABLE "directors_movies_movies" ("directorsID" integer NOT NULL, "moviesID" integer NOT NULL, CONSTRAINT "PK_eecca64e14ad010717e4c42eec5" PRIMARY KEY ("directorsID", "moviesID"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df0ddcdaeccd7a057424bfd20b" ON "directors_movies_movies" ("directorsID") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad144d71da5771faf302eaebae" ON "directors_movies_movies" ("moviesID") `,
    );
    await queryRunner.query(`ALTER TABLE "directors" DROP COLUMN "movieId"`);
    await queryRunner.query(
      `ALTER TABLE "directors_movies_movies" ADD CONSTRAINT "FK_df0ddcdaeccd7a057424bfd20b6" FOREIGN KEY ("directorsID") REFERENCES "directors"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors_movies_movies" ADD CONSTRAINT "FK_ad144d71da5771faf302eaebaec" FOREIGN KEY ("moviesID") REFERENCES "movies"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "directors_movies_movies" DROP CONSTRAINT "FK_ad144d71da5771faf302eaebaec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "directors_movies_movies" DROP CONSTRAINT "FK_df0ddcdaeccd7a057424bfd20b6"`,
    );
    await queryRunner.query(`ALTER TABLE "directors" ADD "movieId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad144d71da5771faf302eaebae"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df0ddcdaeccd7a057424bfd20b"`,
    );
    await queryRunner.query(`DROP TABLE "directors_movies_movies"`);
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_7a04ab3a5d9e7d58913efa0e9f5" FOREIGN KEY ("movieId") REFERENCES "movies"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
