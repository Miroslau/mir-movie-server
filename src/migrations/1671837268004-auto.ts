import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1671837268004 implements MigrationInterface {
  name = 'auto1671837268004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "directors" ("ID" SERIAL NOT NULL, "FIRST_NAME" character varying NOT NULL, "SECOND_NAME" character varying NOT NULL, "BIRTH" TIMESTAMP NOT NULL, "NATIONALITY" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fea3df147245bb65a99453ac6f8" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "genres" ("ID" SERIAL NOT NULL, "GENRE_NAME" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_683831b8dc66889d27981ac22be" UNIQUE ("GENRE_NAME"), CONSTRAINT "PK_d43f1008e62fc15d30762862a1e" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "genres"`);
    await queryRunner.query(`DROP TABLE "directors"`);
  }
}
