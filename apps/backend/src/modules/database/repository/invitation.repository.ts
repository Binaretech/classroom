import { EntityRepository } from '@mikro-orm/postgresql';
import { Invitation } from '../entities/invitations';

export default class InvitationRepository extends EntityRepository<Invitation> {}
