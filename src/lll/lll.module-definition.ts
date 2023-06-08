import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface LllModuleOptions {
  aaa: number;
  bbb: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} =
  //   new ConfigurableModuleBuilder<LllModuleOptions>()
  //   new ConfigurableModuleBuilder<LllModuleOptions>()
  //         .setClassMethodName('forRoot')
  new ConfigurableModuleBuilder<LllModuleOptions>()
    .setClassMethodName('forRoot')
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
