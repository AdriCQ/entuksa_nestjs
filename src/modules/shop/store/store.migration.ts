import { BASE_COLUMNS } from '@modules/BaseModel';
import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ShopStoreMigration implements MigrationInterface {
  name = "ShopStore1638207614880"
  /**
   * 
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shop_stores',
      columns: [
        ...BASE_COLUMNS,
        {
          name: 'title',
          type: DB_COLUMN.varchar,
          length: '128'
        }, {
          name: 'description',
          type: DB_COLUMN.varchar,
        }, {
          name: 'open',
          type: DB_COLUMN.boolean,
          default: 'false'
        }, {
          name: 'rating',
          type: DB_COLUMN.smallint,
          unsigned: true,
          default: 0
        }, {
          name: 'validated_at',
          type: DB_COLUMN.timestamp,
          isNullable: true
        }, {
          name: 'position_id',
          type: DB_COLUMN.bigint
        }, {
          name: 'vendor_id',
          type: DB_COLUMN.bigint
        },
      ],
      foreignKeys: [
        {
          columnNames: ['position_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'map_positions',
          onUpdate: 'CASCADE'
        }, {
          columnNames: ['vendor_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onUpdate: 'CASCADE'
        }
      ]
    }))
  }
  /**
   * 
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_stores');
  }

}
