# galaxy-pay-config


## desc

galaxy-pay 支付配置。当然你也可以用于任意 nestjs 项目中。

## Install

```bash

npm i galaxy-pay-config

```

## User

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
            public_key: public_key,
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