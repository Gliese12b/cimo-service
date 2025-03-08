import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToOne,
  OneToMany,
  Enum,
  ManyToMany,
  Collection,
  Cascade,
  Unique,
  Index,
} from '@mikro-orm/core';

import { v4 } from 'uuid';
import { BaseEntity } from '@/core/entities';

@Entity()
export class Order extends BaseEntity {
  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()', fieldName: 'id' })
  id: string;

  // @Property({ length: 128, fieldName: 'first_name' })
  // firstName: string;

  // @Property({ length: 128, fieldName: 'last_name' })
  // lastName: string;

  // @Property({ length: 255, fieldName: 'full_name' })
  // fullName: string;

  // @Property({ nullable: true, length: 128, fieldName: 'middle_name' })
  // middleName?: string;

  // @Property({ nullable: true, fieldName: 'alias' })
  // alias?: string;

  // @Property({ length: 255, unique: true, fieldName: 'username' })
  // username: string;

  // @Property({ length: 512, fieldName: 'password' })
  // password: string;

  // @Property({ nullable: true, length: 255, fieldName: 'email' })
  // email?: string;

  // @Enum({ fieldName: 'status', items: () => UserStatus, nativeEnumName: 'UserStatus' })
  // status: UserStatus = UserStatus.ACTIVE;

  // @OneToMany(() => UserToRole, (userToRole) => userToRole.user)
  // roles = new Collection<UserToRole>(this);

  // @OneToOne({ entity: () => Profile, mappedBy: (profile) => profile.user, cascade: [Cascade.REMOVE] })
  // profile?: Profile;
}

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()', fieldName: 'id' })
  id: string;
}
