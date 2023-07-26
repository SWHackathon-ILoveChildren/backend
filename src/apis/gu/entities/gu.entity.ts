import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
