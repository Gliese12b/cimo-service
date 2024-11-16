import { DecimalType, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { v4 as uuidV4 } from 'uuid';

@Entity({ tableName: 'media' })
export class Media extends BaseEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidV4();

  @Property({ type: 'text' })
  fileName: string;

  @Property({ type: 'DECIMAL', precision: 2, length: 10 })
  fileSize: number;

  @Property({ type: 'text' })
  fileUrl: string;

  @Property({ type: 'text' })
  fileType: string;
}
