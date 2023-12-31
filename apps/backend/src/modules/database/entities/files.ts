import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class File {
  constructor(data: Partial<File>) {
    Object.assign(this, data);
  }

  @Property()
  path!: string;

  @Property({ persist: false })
  get url() {
    // TODO - Change this to the correct url

    return this.path;
  }
}
