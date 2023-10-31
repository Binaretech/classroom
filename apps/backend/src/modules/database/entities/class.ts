import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Class {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @Property()
  ownerId!: number;

  @Property({ default: false })
  archived: boolean = false;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
