import { Injectable } from '@nestjs/common';
import { AliPayBaseService } from './base.service';
import { AlipayConfig } from '../interfaces/base.interface';
import { AlipayAppBizContent } from '../interfaces/app.interface';

@Injectable()
export class AliAppPayService extends AliPayBaseService {
  /**
   * 支付宝app 服务端支付
   * @param param AlipayAppBizContent
   * @param alipay_config AlipayConfig
   */
  async pay(param: AlipayAppBizContent, alipay_config: AlipayConfig): Promise<String> {
    return this.processParams<AlipayAppBizContent>(param, 'alipay.trade.app.pay', alipay_config);
  }
}
