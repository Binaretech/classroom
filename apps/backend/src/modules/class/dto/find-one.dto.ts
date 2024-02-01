import { exists } from 'src/validation/exists';

export class FindOneParams {
  @exists({ tableName: 'class', column: 'id' })
  id: number;
}
