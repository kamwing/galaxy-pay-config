import { Injectable } from '@nestjs/common';
import { AliPayBaseService } from './base.service';
import { AlipayConfig } from '../interfaces/base.interface';
import { AlipayPageBizContent } from '../interfaces/page.interface';

@Injectable()
export class AliPagePayService extends AliPayBaseService {
  /**
   *
   * 支付宝pc支付
   * @param param AlipayRequestParam
   * @param private_key srting
   */
  pay(biz_content: AlipayPageBizContent, alipay_cconfig: AlipayConfig) {
    return this.processParams(biz_content, 'alipay.trade.page.pay', alipay_cconfig);
  }
}
