import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ShopCategoryMigration implements MigrationInterface {
  name = 'ShopCategory1638206442122'
  /**
   * up
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shop_categories',
      columns: [
        {
          name: 'id',
          type: DB_COLUMN.varchar,
          isUnique: true,
        }, {
          name: 'title',
          type: DB_COLUMN.varchar
        }, {
          name: 'description',
          type: DB_COLUMN.varchar
        }, {
          name: 'icon',
          type: DB_COLUMN.varchar,
          length: '64'
        }, {
          name: 'parent_id',
          type: DB_COLUMN.varchar,
        }
      ], foreignKeys: [
        {
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'shop_categories',
          onDelete: 'CASCADE'
        }
      ]
    }), true)
  }
  /**
   * down
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_categories');
  }

}
