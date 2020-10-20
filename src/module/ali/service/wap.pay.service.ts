import { Injectable } from '@nestjs/common';
import { AliPayBaseService } from './base.service';
import { AlipayConfig } from '../interfaces/base.interface';
import { AlipayWapBizContent } from '../interfaces/wap.interface';

@Injectable()
export class AliWapPayService extends AliPayBaseService {
  /**
   * h5 支付
   * 支付宝支付参数拼接
   * @param config AlipayConfig
   * @param body AlipayPageBizContent
   */
  pay(biz_content: AlipayWapBizContent, alipay_config: AlipayConfig): string {
    return this.processParams(biz_content, 'alipay.trade.wap.pay', alipay_config);
  }
}
