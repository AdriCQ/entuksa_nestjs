import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('seeders')
export class Seeder {
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn()
  creationDate: Date;

  constructor(id?: string) {
    this.id = id;
  }
}