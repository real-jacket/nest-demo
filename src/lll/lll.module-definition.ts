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
    .setClassMethodName('register')
    .setExtras(
      {
        isGlobal: false,
        isFake: true,
      },
      (definition, extras) => {
        console.log('extras: ', extras);
        return {
          ...definition,
          global: extras.isGlobal,
        };
      },
    )
    .build();
