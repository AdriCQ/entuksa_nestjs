import { Entity, PrimaryColumn, CreateDateColumn, Column } from 'typeorm';

@Entity('seeders')
export class Seeder {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  creationDate: Date;

  constructor(id: string, desc: string) {
    this.id = id;
    this.description = desc;
  }
}