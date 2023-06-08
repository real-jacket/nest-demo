import { Module, forwardRef } from '@nestjs/common';
import { NnnModule } from '../nnn/nnn.module';

@Module({
  imports: [forwardRef(() => NnnModule)],
})
export class MmmModule {}
