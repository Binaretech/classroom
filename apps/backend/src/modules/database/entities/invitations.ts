import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Class } from './class';

@Entity()
export class Invitation {
  constructor(data: Partial<Invitation>) {
    Object.assign(this, data);
  }

  @PrimaryKey()
  id!: number;

  @Property()
  invitedEmail!: string;

  @Property()
  code!: string;

  @Enum(() => InvitationStatus)
  status!: InvitationStatus;

  @ManyToOne(() => Class)
  class!: Class;

  getInvitationUrl(baseUrl: string) {
    return `${baseUrl}/invitation/${this.code}`;
  }
}

export enum InvitationStatus {
  Pending,
  Accepted,
  Declined,
  Cancelled,
}
