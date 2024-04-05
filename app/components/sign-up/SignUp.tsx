"use client";

import { userAPI } from "@/api/userAPI";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/configs/firebase.init";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const customInputStyle = {
  border: "1px solid #60a5fa",
  width: "100%",
};
function SignUp() {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { toast } = useToast();
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };
  const handleAuthenticateOtp = () => {
    route.push(`/auth/sign-up/identify?phone=${phone}&verified=true`);
  };
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      window.recaptchaVerifier.render();
    }
  };

  const getUser = async () => {
    try {
      const res = await userAPI.getUserByPhone(`user/get-user/${phone}`);

      return res;
    } catch (e) {
      return e;
    }
  };

  const onOtpVerify = () => {
    if (window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then((result: any) => {
          handleAuthenticateOtp();
        })
        .catch((err: any) => {
          if (err.code == "auth/invalid-verification-code") {
            toast({
              title: "Xác thực không thành công",
              description: "Mã xác thực không chính xác !",
              duration: 2000,
              variant: "destructive",
            });
          } else if (err.code == "auth/code-expired") {
            toast({
              title: "Xác thực không thành công",
              description: "Mã xác thực đã hết hạn !",
              duration: 2000,
              variant: "destructive",
            });
          }
          console.log(err);
        });
    } else {
      toast({
        title: "Xác thực không thành công",
        description: "Mã xác thực không hợp lệ !",
        duration: 2000,
        variant: "destructive",
      });
    }
  };
  const handleSendOpt = async () => {
    const user = await getUser();
    if (user?.username) {
      toast({
        description: "Tài khoản đã tồn tại",
        duration: 2000,
        variant: "destructive",
      });
      return;
    }

    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast({
          description: "Đã gửi mã xác thực !",
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log("err", error);
        toast({
          title: "Đã có lỗi xảy ra",
          description: "Gửi mã xác thực không thành công !",
          duration: 2000,
          variant: "destructive",
        });
      });
  };
  return (
    <div className="bg-gradient-to-bl from-cyan-200 to-blue-400 h-screen w-screen flex justify-center">
      {/* recaptcha */}
      <div id="recaptcha-container"></div>
      <div>
        <div className="text-center mt-[50px]">
          <h1 className="text-blue-600 text-5xl font-bold">TinTin</h1>
          <h2 className="mt-2">
            Đăng ký tài khoản TinTin <br />
            Thông tin bảo mật đến với lựa chọn khách hàng
          </h2>
        </div>
        <div className="bg-white w-[420px] mt-6 ">
          <div className="">
            <h3 className="text-center p-4 border-b">Đăng ký tài khoản</h3>
          </div>
          <div className="pl-8 pr-8">
            <div className="flex mt-8 pb-2 gap-3 flex-col">
              <span className="text-sm">Số điện thoại</span>
              <PhoneInput
                country={"vn"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={customInputStyle}
              />
            </div>
            <div className="flex justify-center items-center gap-3 pt-4 flex-col">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm">Mã xác thực</span>
                <Button
                  id="send-sms-button"
                  onClick={handleSendOpt}
                  variant="link"
                  className="pr-0"
                >
                  Gửi mã
                </Button>
              </div>
              <InputOTP
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}{" "}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>

          {/* log in */}
          <div className="pl-8 pr-8 mt-8">
            <button
              className=" bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600 flex gap-2 items-center justify-center"
              onClick={onOtpVerify}
            >
              {loading && <Loader2 className="animate-spin" />}
              <span>Xác thực mã OTP</span>
            </button>
          </div>

          {/* quên mật khẩu */}
          <div className="pb-4 mt-3 text-center">
            <Link
              suppressHydrationWarning
              href="/auth/sign-in"
              className="hover:underline"
            >
              Quay về
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
