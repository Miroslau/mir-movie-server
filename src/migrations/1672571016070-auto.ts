import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1672571016070 implements MigrationInterface {
    name = 'auto1672571016070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "directors" ADD "IMAGE" character varying`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "POSTER" character varying`);
        await queryRunner.query(`ALTER TABLE "actors" ADD "IMAGE" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actors" DROP COLUMN "IMAGE"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "POSTER"`);
        await queryRunner.query(`ALTER TABLE "directors" DROP COLUMN "IMAGE"`);
    }

}
