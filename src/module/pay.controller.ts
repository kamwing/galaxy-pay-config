import { Controller, Get } from '@nestjs/common';
import { AliPagePayService } from './ali';

@Controller()
export class PayController {
  constructor(private readonly alipa: AliPagePayService) {}

  @Get('')
  test() {
    return this.alipa.pay(
      {
        product_code: 'FAST_INSTANT_TRADE_PAY',
        subject: '不知道',
        out_trade_no: '1602553453123242',
        total_amount: '0.01',
      },
      {
        appid: '2021001189605208',
        private_key:
          '-----BEGIN RSA PRIVATE KEY-----\r\n' +
          'MIIEowIBAAKCAQEAlNSMy8QHvr06U42xlYCk8gZFFZXqdBXnIRTLHFt9GD0C+ARakp5bl8gHubNNn3PRjvmixRZrYdYGyxKf/02aGDTW83Ct0qJ1WhbbYg+qk1ItlsBClNfjUXiQ9FZ4qYHJqTg6MsfCQLoZHNolGZaO3hZ4Qp3JiEVavCs+YKnZekpnhRTVsQIssj9H8+5UuWJt0Q22Y670sPjr6LCf5dsNcElGIkH7gkKNcHrAOiqyAxtPX7mkJZ1mif2YXYoERQhU9lmh2tntVhY/xSlU5FVt16m7HUmohz/1P5eHP3jh4d2PTkHHgHeqWXwd/9mE9TKLIoqwvrsOpbVmJQIZLGwX6QIDAQABAoIBAHgPTtVB+g2AkQC+GTfFY0pqjGhxW4Tx9lXVdFQX6b4X2cFBod8NKE406yZ+4mty/uYbs5bSEyYFhc1j5PYLH/fPCGexykdVDt3x+mAMy0m0zVoDFrMDxTj/zc+NwiDbtlZwKWK1ipq0hXWk9LDDp9S4w6LZrq3jZOLO768C1ZG0HCLBPp2/VAAdFUdnlEo1FDfFzSsLBnd8rIEY+EXD6vExlamS9IYv8oN5ikxt63N1WTESVMVUeV4jg43GRazqyXjQfC6hZXZnzOOwuSiqG50YRn9OsuOEqAoCmlAZcnJ3Zp0cIBPHPIFLuFDISYj+GV9azwLmX97zhinn3L3hrxECgYEA6MyucKN+ztOO19g3QqMYvtncjYZjePzVbeew49N6nW8R8KOphAcvXlJTdL9fOwriOHKqP9L7KOBBFg2AKxa7/4BetF+cfkWy/WvrE7+JgjICG8as2EDEqgKtUFmoXq5nu1nBBaKf3MfmSdP9+J512g57ew7VY7TjXBkK4Vs2woMCgYEAo6mYaw/i2Ox+eoHOECkvcjNwbv7XTPk2b2QfUaA7+00Z7/dgrIHt5TVgbL798N8UA59udyG4lGJ+MNcl0eH2daJ7DHngYn6XWIdQcBZju7toHQuNSdMLa7TzfZnPzYolnZ9h4JsK6pmpOo2rCXnHAQHVEmhrORBgH/I26Os6gCMCgYBX0+i33CbaNtx8ODlY7ZlHX4Ai8KGUoqaOyUtmGIH45U96XvR0OBW52wtbT1vJNaj1LOVoINvapwhHHp7NIs2YbkDMggnTZc5KZ62PjMJ/GQjMm97X00+e6FWkq76mwdumxgzZaGoxbEVIcy8s3fOOacpSOd1tuW/Rbi05qiT1qwKBgEPvbjliysNIx+eKYkMLFYrOF2m7lxt4h0QNx4JWhQ93ncCiaxqwhFOUqIX7ceW+c8xdLbl94eSWTdNwO1638Vo7K+Ct5pp7+c7hvF4KrTOMQ1drKCbw19jJsBj+8+dZ5Otc8YAOW6WuSzTnAYxZZGXioNOXTIrPZVddb7WXjx0JAoGBAMIRVFR6TgEXCRr9gBrhOwgjzThFpw1CNBWcufVzG9Z8k+JBIZE8Wm+yYUZd2HbZ6fTwRljxmeHRE5hO3SugpmQ3L+On2DgXz75onbYXr7ITLM3376dEH8PJ/z4ROxKkTGBVUytlcJ0qH41MSM2HiM6wzVI+ObszloB0JfGW79ih\r\n' +
          '-----END RSA PRIVATE KEY-----',
        public_key:
          '-----BEGIN PUBLIC KEY-----\r\n' +
          'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmJXgFps1FMzgTtjkvzVrqSi79bsukvuTHJ7bct15pnl0W7Pc9omokwdQ7N9yKAU6/mJdcq4pxEbEVKZrEeFaYOacqab0Ru0r0if77ujn9WjCCbYDBFIwPf6mMlrizDL82JutmNeXxN7q8B1ys1M6ozjzwuEy+G8YplPWaZp/LFpCQkUCb4JmPO+sERTxv8PBjB4D1kn+bALtbJz2yUsYPJL5yd7sAlqZNeudLwJdTGrMnZwCn5E+UkP4tkb/fqjYL1p3ehFMyMztD8vgrXLeRC+6bxVc4fBWA9SlphG6fGgLOaPSvyERpH04TV61jD8+0lmHIObkvyzxpHBj5Iq8rQIDAQAB\r\n' +
          '-----END PUBLIC KEY-----',
        callback_url: 'http://www.baidu.com',
        return_url: 'http://www.baidu.com',
        notify_url: '127.0.0.1:3100/alipay_notify_url',
      },
    );
  }
}
