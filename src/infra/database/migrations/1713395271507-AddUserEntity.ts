import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1713395271507 implements MigrationInterface {
    name = 'AddUserEntity1713395271507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(128) NOT NULL, "role" character varying(128) NOT NULL, "email" character varying(256) NOT NULL, "imageUrl" character varying(1024), "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
