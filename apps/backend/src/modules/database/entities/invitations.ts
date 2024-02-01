import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Class } from './class';
import InvitationRepository from '../repository/invitation.repository';

@Entity({ customRepository: () => InvitationRepository })
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

  [EntityRepositoryType]?: InvitationRepository;
}

export enum InvitationStatus {
  Pending,
  Accepted,
  Declined,
  Cancelled,
}
