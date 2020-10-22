import { Injectable } from '@nestjs/common';
import { AliPayBaseService } from './base.service';
import { AlipayConfig } from '../interfaces/base.interface';
import {
  AlipayTradeRefundResponseData,
  AlipayTradeCreateResponse,
  AlipayTradeCreateResponseData,
  AlipayCreateBizContent,
  AlipayPrecreateBizContent,
  AlipayPrecreateRes,
  AlipayPrecreateResData,
} from '../interfaces/trade.interface';
import { AlipayRefundBizContent } from '../interfaces/refund.interface';

@Injectable()
export class AliTradePayService extends AliPayBaseService {
  /**
   * 支付宝查询接口
   * @param config AlipayConfig
   * @param body
   */
  // async query(biz_content, alipay_config: AlipayConfig): Promise<AlipayTradeQueryResponse> {
  // }

  /**
   * 支付宝退款接口
   * @param biz_content AlipayRefundBizContent
   * @param alipay_config AlipayConfig
   */
  async refund(biz_content: AlipayRefundBizContent, alipay_config: AlipayConfig): Promise<any> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.refund', alipay_config);
      const { alipay_trade_refund_response } = await this.requestUtil.post<
        AlipayTradeRefundResponseData
      >(url, alipay_config.public_key);
      return alipay_trade_refund_response;
    } catch (e) {
      throw new Error(e.toString());
    }
  }

  /**
   * 支付宝订单创建
   * @param biz_content AlipayRequestParam
   * @param private_key string
   * @param public_key string
   */
  async create(
    biz_content: AlipayCreateBizContent,
    alipay_config: AlipayConfig,
  ): Promise<AlipayTradeCreateResponse> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.create', alipay_config);
      const { alipay_trade_create_response } = await this.requestUtil.post<
        AlipayTradeCreateResponseData
      >(url, alipay_config.public_key);
      return alipay_trade_create_response;
    } catch (e) {
      throw new Error(e.toString());
    }
  }

  /**
   * 支付宝关闭订单接口
   * @param biz_content
   * @param alipay_config AlipayConfig
   */
  // async close(biz_content, alipay_config: AlipayConfig): Promise<any> {
  // }

  /**
   * 支付宝扫码接口
   * @param biz_content AlipayPrecreateBizContent
   * @param alipay_config AlipayConfig
   */
  async precreate(
    biz_content: AlipayPrecreateBizContent,
    alipay_config: AlipayConfig,
  ): Promise<AlipayPrecreateRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.precreate', alipay_config);
      const { alipay_trade_precreate_response } = await this.requestUtil.post<
        AlipayPrecreateResData
      >(url, alipay_config.public_key);
      return alipay_trade_precreate_response;
    } catch (e) {
      throw new Error(e.toString());
    }
  }
}
