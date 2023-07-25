import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
