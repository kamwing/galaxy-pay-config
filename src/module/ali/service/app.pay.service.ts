import { Injectable } from '@nestjs/common';
import { AliPayBaseService } from './base.service';
import { AlipayConfig } from '../interfaces/base.interface';
import { AlipayAppBizContent } from '../interfaces/app.interface';

@Injectable()
export class AliAppPayService extends AliPayBaseService {
  /**
   * 支付宝app 服务端支付
   * @param biz_content AlipayAppBizContent
   * @param alipay_config AlipayConfig
   */
  async pay(biz_content: AlipayAppBizContent, alipay_config: AlipayConfig): Promise<string> {
    return this.processParams<AlipayAppBizContent>(
      biz_content,
      'alipay.trade.app.pay',
      alipay_config,
    );
  }
}
