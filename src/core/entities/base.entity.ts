import { Entity, Opt, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @Property({ type: 'timestamptz', length: 6, defaultRaw: 'now()' })
  createdAt: Date & Opt;

  @Property({ type: 'timestamptz', length: 6, defaultRaw: 'now()', onUpdate: () => new Date() })
  updatedAt: Date & Opt;

  @Property({ type: 'uuid' })
  createdById?: string;

  @Property({ type: 'uuid' })
  updatedById?: string;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean & Opt;
}
