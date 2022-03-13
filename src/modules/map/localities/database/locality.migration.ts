import { DB_COLUMN } from '@modules/types';
import { BASE_COLUMNS } from '@modules/BaseModel';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MapLocalityMigration implements MigrationInterface {
  name = 'MapLocality1638202418635';
  /**
   * 
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'map_localities',
      columns: [
        ...BASE_COLUMNS, {
          name: 'title',
          type: DB_COLUMN.varchar
        }, {
          name: 'description',
          type: DB_COLUMN.varchar
        }, {
          name: 'parent_id',
          type: 'bigint',
        }, {
          name: 'position_id',
          type: DB_COLUMN.bigint,
        }
      ], foreignKeys: [
        {
          columnNames: ['parent_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'map_localities',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }, {
          columnNames: ['position_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'map_positions',
          onUpdate: 'CASCADE',
        }
      ]
    }))
  }
  /**
   * 
   * @param queryRunner 
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('map_localities');
  }

}
