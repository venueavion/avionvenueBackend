import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('avion_venue_images')
export class ImageEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number; // or string if you prefer

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar' })
  filename: string;

  @Column({ type: 'text', nullable: true })  // Make nullable if optional
  type: string;

  @Column({ type: 'text' })
  path: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  category: string | null;
}