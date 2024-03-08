"use client";

import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/configs/firebase.init";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Loader2, LoaderIcon } from "lucide-react";
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
  const [otp, setOtp] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const handleOtpChange = (value: number) => {
    setOtp(value);
  };
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        getAuth(),
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            handleSendOpt();
          },
        }
      );
    }
  };
  const handleAuthenticateOtp = () => {
    route.push("/auth/sign-up/identify");
  };
  const handleSendOpt = () => {
    // setResult(true);
    onCaptchVerify();

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
          <h1 className="text-blue-600 text-5xl font-bold">Zalo</h1>
          <h2 className="mt-2">
            Đăng ký tài khoản Zalo <br />
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
              <OtpInput length={6} otp={otp} onOtpChange={handleOtpChange} />
            </div>
          </div>

          {/* log in */}
          <div className="pl-8 pr-8 mt-8">
            <button
              className=" bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600 flex gap-2 items-center justify-center"
              onClick={handleAuthenticateOtp}
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
