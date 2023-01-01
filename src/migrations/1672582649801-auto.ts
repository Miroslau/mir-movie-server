import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1672582649801 implements MigrationInterface {
    name = 'auto1672582649801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "HORIZONTAL_POSTER" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "HORIZONTAL_POSTER"`);
    }

}
