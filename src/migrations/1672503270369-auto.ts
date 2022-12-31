import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1672503270369 implements MigrationInterface {
    name = 'auto1672503270369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies_genres_genres" ("moviesID" integer NOT NULL, "genresID" integer NOT NULL, CONSTRAINT "PK_35daf9b9bf361528a28499ba91e" PRIMARY KEY ("moviesID", "genresID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1addfd21c42719666d789ae5e7" ON "movies_genres_genres" ("moviesID") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2fb53454a9fd66f5e8448accd" ON "movies_genres_genres" ("genresID") `);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_1addfd21c42719666d789ae5e74" FOREIGN KEY ("moviesID") REFERENCES "movies"("ID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_f2fb53454a9fd66f5e8448accd7" FOREIGN KEY ("genresID") REFERENCES "genres"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_f2fb53454a9fd66f5e8448accd7"`);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_1addfd21c42719666d789ae5e74"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2fb53454a9fd66f5e8448accd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1addfd21c42719666d789ae5e7"`);
        await queryRunner.query(`DROP TABLE "movies_genres_genres"`);
    }

}
