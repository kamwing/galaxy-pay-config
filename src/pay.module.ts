import { Module } from '@nestjs/common';
import { AliPayModule } from './module/ali/ali.pay.module';
import { PayController } from './module/pay.controller';
import { WechatPayModule } from './module/wechat/wechat.pay.module';

@Module({
  imports: [WechatPayModule, AliPayModule],
  exports: [WechatPayModule, AliPayModule],
  controllers: [PayController],
})
export class PayModule {}
