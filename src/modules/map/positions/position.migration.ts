import { BASE_COLUMNS } from '@modules/BaseModel';
import { DB_COLUMN } from '@modules/types';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MapPositionsMigration implements MigrationInterface {
  name = 'MapPositions1638202418535';
  /**
   * up
   * @param queryRunner 
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'map_positions',
      columns: [
        ...BASE_COLUMNS,
        {
          name: 'address',
          type: DB_COLUMN.varchar
        }, {
          name: 'coordinate',
          type: 'json',
          default: `'${JSON.stringify({ "lat": 0, "lng": 0 })}'`,
        }, {
          name: 'validated_at',
          type: DB_COLUMN.timestamp,
          isNullable: true
        }
      ],
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
