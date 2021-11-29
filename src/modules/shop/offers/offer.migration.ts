import { BASE_COLUMNS } from '@modules/BaseModel';
import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ShopOffersMigration implements MigrationInterface {
  name = "ShopOffers1638207714880"
  /**
   * up
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'shop_offers',
      columns: [
        ...BASE_COLUMNS,
        {
          name: 'title',
          type: DB_COLUMN.varchar
        }, {
          name: 'description',
          type: DB_COLUMN.varchar
        }, {
          name: 'prices',
          type: DB_COLUMN.json
        }, {
          name: 'stock',
          type: DB_COLUMN.json
        }, {
          name: 'type',
          type: DB_COLUMN.varchar,
          length: '64'
        }, {
          name: 'attributes',
          type: DB_COLUMN.json,
          isNullable: true
        }, {
          name: 'configurable',
          type: DB_COLUMN.json,
          isNullable: true
        }, {
          name: 'configurable_with_price',
          type: DB_COLUMN.json,
          isNullable: true
        }, {
          name: 'rating',
          type: 'smallint',
          unsigned: true,
          default: 0
        }, {
          name: 'onsale',
          type: 'boolean',
          default: 'false'
        }, {
          name: 'validated_at',
          type: DB_COLUMN.timestamp,
          isNullable: true
        }, {
          name: 'category_id',
          type: DB_COLUMN.varchar
        }, {
          name: 'image_id',
          type: DB_COLUMN.bigint
        }, {
          name: 'store_id',
          type: DB_COLUMN.bigint
        }
      ], foreignKeys: [
        {
          columnNames: ['category_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'shop_categories',
          onDelete: 'CASCADE'
        }, {
          columnNames: ['image_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'images',
          onDelete: 'CASCADE'
        }, {
          columnNames: ['store_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'shop_stores',
          onDelete: 'CASCADE'
        },
      ],
    }));
  }
  /**
   * down
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
