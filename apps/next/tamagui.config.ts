import { config as configBase } from '@tamagui/config/v2';
import { createTamagui } from 'tamagui';

const config = createTamagui({
  ...configBase,
  themeClassNameOnRoot: false,
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
