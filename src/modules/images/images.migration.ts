import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";
/**
 * ImagesMigration
 */
export class ImagesMigration implements MigrationInterface {
  name = 'Images1638200361985';
  /**
   * up
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: DB_COLUMN.bigint,
          isGenerated: true,
          isPrimary: true,
        }, {
          name: 'title',
          type: DB_COLUMN.varchar,
        }, {
          name: 'tags',
          type: DB_COLUMN.json,
          isArray: true,
          isNullable: true
        }, {
          name: 'paths',
          type: DB_COLUMN.json
        }, {
          name: 'owner_id',
          type: DB_COLUMN.bigint,
        }
      ], foreignKeys: [
        {
          columnNames: ['owner_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ],
    }), true)
  }
  /**
   * down
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
