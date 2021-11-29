import { BASE_COLUMNS } from '@modules/BaseModel';
import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ShopOrderMigration1638209719832 implements MigrationInterface {
  name = 'ShopOrder1638209719832';
  /**
   * up
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shop_orders',
      columns: [
        ...BASE_COLUMNS,
        {
          name: 'price',
          type: 'decimal',
          precision: 8,
          scale: 2
        }, {
          name: 'price_details',
          type: 'json'
        }, {
          name: 'status',
          type: DB_COLUMN.varchar,
          length: '64',
        }, {
          name: 'client_id',
          type: DB_COLUMN.bigint
        }, {
          name: 'vendor_id',
          type: DB_COLUMN.bigint
        }
      ],
      foreignKeys: [
        {
          columnNames: ['client_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, {
          columnNames: ['vendor_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }), true);

    await queryRunner.createTable(new Table({
      name: 'shop_order_offers',
      columns: [
        {
          name: 'id',
          type: DB_COLUMN.bigint,
          unsigned: true,
          isPrimary: true,
        }, {
          name: 'qty',
          type: DB_COLUMN.smallint,
          default: 0
        }, {
          name: 'order_id',
          type: DB_COLUMN.bigint
        }, {
          name: 'offer_id',
          type: DB_COLUMN.bigint
        }
      ],
      foreignKeys: [
        {
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'shop_orders',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }, {
          columnNames: ['offer_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'shop_offers'
        }
      ]
    }), true)
  }
  /**
   * down
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop_orders');
    await queryRunner.dropTable('shop_order_offers');
  }

}
