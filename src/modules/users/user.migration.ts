import { BASE_COLUMNS } from '@modules/BaseModel';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration implements MigrationInterface {
  name = 'Users1638198103610';
  /**
   * up
   * @param queryRunner 
   */
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        ...BASE_COLUMNS,
        {
          name: 'name',
          type: 'varchar',
          length: '64',
        }, {
          name: 'last_name',
          type: 'varchar',
          length: '128'
        }, {
          name: 'email',
          type: 'varchar',
          length: '128',
          isUnique: true
        }, {
          name: 'email_verified_at',
          type: 'timestamp',
          isNullable: true,
        }, {
          name: 'mobile_phone',
          type: 'varchar',
          length: '12',
          isUnique: true,
          isNullable: true,
        }, {
          name: 'mobile_phone_verified_at',
          type: 'timestamp',
          isNullable: true,
        }, {
          name: 'password',
          type: 'varchar',
        }, {
          name: 'roles',
          type: 'json',
          // isArray: true,
          default: `'${JSON.stringify(["CLIENT"])}'`
        }
      ],
    }), true);
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }

}
