import { Injectable } from '@nestjs/common';
import { WeChatOtherPayOrderReqParam, WeChatOtherPayOrderRes } from '../interfaces/order.interface';
import { WeChatPayBaseService } from './base.service';
import { WechatConfig } from '../interfaces/base.interface';
import { WeChatTradeType } from '../enums/trade-type.enum';

/**
 * 微信支付-小程序支付类
 */
@Injectable()
export class WeChatAppletPayService extends WeChatPayBaseService {
  /**
   * 小程序支付
   * @param wechatConfig
   * @param params 小程序支付接口请求参数
   */
  async pay(params: WeChatOtherPayOrderReqParam, wechat_config: WechatConfig): Promise<any> {
    params.trade_type = WeChatTradeType.JSAPI;

    const result = await this.requestUtil.post<WeChatOtherPayOrderRes>(
      this.unifiedOrderUrl,
      this.processParams(params, wechat_config),
    );
    if (result.return_code !== 'SUCCESS') {
      throw new Error(result.return_msg);
    }
    // 请求微信服务器之后，返回的参数还需要再做一次加密
    const data = {
      appId: result.appid,
      timeStamp: Date.parse(new Date().toString()).toString(),
      nonceStr: result.nonce_str,
      package: 'prepay_id=' + result.prepay_id,
      signType: 'MD5',
    };
    return { ...data, ...{ paySign: this.signUtil.sign(data, wechat_config.mch_key) } };
  }
}
