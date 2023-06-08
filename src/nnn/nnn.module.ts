import { Module, forwardRef } from '@nestjs/common';
import { MmmModule } from '../mmm/mmm.module';

@Module({
  imports: [forwardRef(() => MmmModule)],
})
export class NnnModule {}
