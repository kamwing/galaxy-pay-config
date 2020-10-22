import { Injectable, Inject } from '@nestjs/common';
import { AliRequestUtil } from '../utils/request.util';
import { AliParamsUtil } from '../utils/params.util';
import { AliSignUtil } from '../utils/sign.util';
import { AlipayConfig } from '../interfaces/base.interface';
import * as moment from 'moment';

@Injectable()
export class AliPayBaseService {
  protected alipay_gate_way = 'https://openapi.alipay.com/gateway.do?';

  constructor(
    @Inject(AliRequestUtil) protected readonly requestUtil: AliRequestUtil,
    @Inject(AliParamsUtil) protected readonly paramsUtil: AliParamsUtil,
    @Inject(AliSignUtil) protected readonly singinUtil: AliSignUtil,
  ) {}

  /**
   * 对请求参数进行组装、编码、签名，返回已组装好签名的参数字符串
   * @param biz_content 请求参数
   * @param method 支付宝支付方式
   * @param alipay_config 支付宝配置
   * @returns {String}
   */
  processParams<T>(biz_content: T, method: string, alipay_config: AlipayConfig): string {
    const request_param = {
      app_id: alipay_config.appid,
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      version: '1.0',
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      notify_url: alipay_config.notify_url,
      return_url: alipay_config.return_url,
      method: method,
      biz_content: JSON.stringify({
        ...biz_content,
      }),
    };
    try {
      const { encode, unencode } = this.paramsUtil.encodeParams(request_param);
      const sign = this.singinUtil.sign(unencode, alipay_config.private_key);
      if (method === 'alipay.trade.app.pay') {
        return `${encode}&sign=` + encodeURIComponent(sign);
      } else {
        return `${this.alipay_gate_way}${encode}&sign=` + encodeURIComponent(sign);
      }
    } catch (e) {
      throw new Error(e.toString());
    }
  }
}
