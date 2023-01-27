import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'set',
    enum: ['admin', 'editor', 'guest'],
    default: ['guest'],
  })
  roles: string[];

  @Column()
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    // @todo move salt to config
    const SALT = 8;

    this.password = await bcrypt.hash(this.password, SALT);
  }

  // @todo implement this
  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }
}
