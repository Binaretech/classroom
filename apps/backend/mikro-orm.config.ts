import { LoadStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
import * as path from 'path';

export default defineConfig({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ['dist/**/entities/*.js'],
  entitiesTs: ['src/**/entities/*.ts'],
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: path.join('dist', 'src', 'modules', 'database', 'migrations'),
    pathTs: path.join('src', 'modules', 'database', 'migrations'),
  },
  metadataProvider: TsMorphMetadataProvider,

  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator, SeedManager],
});
