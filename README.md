# galaxy-pay-config


## 介绍

galaxy-pay 支付配置。当然你也可以用于任意 nestjs 项目中。

## 安装

```bash

npm i galaxy-pay-config

```

## 使用

```
    ...
        constructor(
            private readonly wechatAppPayService: WeChatAppPayService,
            private aliPagePayService: AliPagePayService,
            private antcertUtil: AntcertUtil,
        ) {}
    ...

    /**
    * 
    * 支付宝支付 根证书模式
    * 根证书模式需要先调用 AntcertUtil.getCertPattern 解析出根证书
    * 没有解析 alipay_cert_sn
    * alipay.open.app.alipaycert.download 无法调用
    *
    */
    @Post("aliPagePay")
    aliPagePay() {
        const {
            app_cert_sn,
            alipay_root_cert_sn,
            public_key,
        } = this.antcertUtil.getCertPattern(
            app_cert_sn_path,
            alipay_root_cert_sn_path, 
            alipay_public_cert_path
        );

        return this.aliPagePayService.pay({
            out_trade_no: '订单编号',
            total_amount: "0.01",
            body: '不知道',
            product_code: 'FAST_INSTANT_TRADE_PAY',
            subject: '你猜~~',
        }, {
            appid: 'appid',
            private_key: 'private_key',
            return_url: '支付完成时跳转页面',
            notify_url: '异步通知地址',
            app_cert_sn: app_cert_sn,
            alipay_root_cert_sn: alipay_root_cert_sn,
            public_key: public_key,
        });
    }

    /**
    * 
    * 支付宝支付 公钥模式
    *
    */
    @Post("aliPagePay")
    aliPagePay() {
        return this.aliPagePayService.pay({
            out_trade_no: '订单编号',
            total_amount: "0.01",
            body: '不知道',
            product_code: 'FAST_INSTANT_TRADE_PAY',
            subject: '你猜~~',
        }, {
            appid: 'appid',
            private_key: 'private_key',
            return_url: '支付完成时跳转页面',
            notify_url: '异步通知地址',
            public_key: 'public_key',
        });
    }

    /**
    * 
    * 微信支付，退款打款功能则需要 apiclient_cert
    *
    */
    @Post("wxAppPay")
    wxAppPay() {
        return this.wechatAppPayService.pay({
            trade_type: WeChatTradeType.APP,
            total_fee: '金额',
            out_trade_no: '订单编号',
            body: '订单描述',
            spbill_create_ip: '终端IP'
        }, {
            appid: 'appid',
            mch_id: 'mch_id',
            mch_key: 'mch_key',
            app_secret: 'app_secret',
            return_url: '你的return_url',
            notify_url: '异步通知地址',
            /** 资金接口带上 apiclient_cert 即可 */
            apiclient_cert: fs.readFileSync('path') // 资金接口必须传递！ 可以传递文件地址 和 二进制流
        });
    }

```


## 已实现接口

### 支付宝

* **APP支付接口**
	
	alipay.trade.app.pay **AliAppPayService.pay**
	
* **单笔转账接口**

	alipay.fund.trans.uni.transfer  **AliFundPayService.transUniTransfer**

* **支付宝查询转账订单接口**

    alipay.fund.trans.order.query   **AliFundPayService.transOrderQuery**

* **转账业务单据查询接口**

    alipay.fund.trans.common.query   **AliFundPayService.transCommonQuery**

* **统一收单下单并支付页面接口**

    alipay.trade.page.pay   **AliPagePayService.pay**

* **统一收单线下交易查询**

    alipay.trade.query   **AliTradePayService.query**

* **统一收单交易退款接口**

    alipay.trade.refund   **AliTradePayService.refund**

* **统一收单交易创建接口**

    alipay.trade.create   **AliTradePayService.create**

* **统一收单交易关闭接口**

    alipay.trade.close   **AliTradePayService.close**

* **统一收单交易退款查询**

    alipay.trade.fastpay.refund.query   **AliTradePayService.fastpayRefundQuery**

* **统一收单交易撤销接口**

    alipay.trade.cancel **AliTradePayService.cancel**

* **手机网站支付接口**

    alipay.trade.wap.pay **AliWapPayService.pay**


### 微信

* **App支付接口**

    App支付 **WeChatAppPayService.pay**

    App交易查询  **WeChatAppPayService.queryOrder**

    App交易关闭  **WeChatAppPayService.closeOrder**

    App交易退款  **WeChatAppPayService.queryRefund**  

* **小程序支付接口**

    微信小程序支付 **WeChatAppletPayService.pay**

* **JSAPI支付接口**

   JSAPI支付 **WeChatJSAPIPayService.pay**

* **扫码支付接口**

   微信扫码支付 **WeChatMicroPayService.pay**

* **扫码支付接口**

   微信扫码支付 **WeChatMicroPayService.pay**

* **Native支付接口**

   Native支付  **WeChatNativePayService.pay**

* **H5支付支付接口**

   H5支付  **WeChatWapPayService.pay**