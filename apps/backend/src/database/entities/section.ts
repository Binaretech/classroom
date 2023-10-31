import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Section {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
