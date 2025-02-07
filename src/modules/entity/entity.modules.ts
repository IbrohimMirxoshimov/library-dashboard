import {authorModule} from '@modules/author/author.module';

import {ENTITY} from './entity.type';

export const entityModules = {
  [ENTITY.AUTHOR]: authorModule,
};
