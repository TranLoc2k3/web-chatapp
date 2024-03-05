"use client";
import { Lock } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
function SignIn() {
  const [phone, setPhone] = useState<string>("");
  const customInputStyle = {
    border: "1px solid #60a5fa",
    width: "100%",
  };
  return (
    <div className="bg-gradient-to-bl from-cyan-200 to-blue-400 h-screen w-screen flex justify-center">
      <div>
        <div className="text-center mt-[50px]">
          <h1 className="text-blue-600 text-5xl font-bold ">Zalo</h1>
          <h2 className="mt-2">
            Đăng nhập tài khoản Zalo <br />
            để kết nối với ứng dụng Zalo Web
          </h2>
        </div>
        <div className="bg-white w-[420px] h-[400px] mt-6 ">
          <div className="">
            <h3 className="text-center p-4  border-b">Với số điện thoại</h3>
          </div>
          <div className="pl-8 pr-8">
            <div className="flex mt-8 border-b pb-2">
              <PhoneInput
                country={"vn"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={customInputStyle}
              />
            </div>
          </div>
          {/* password */}
          <div className="pl-8 pr-8">
            <div className="flex mt-8 border-b pb-2">
              <span className="mr-4">
                <Lock />
              </span>

              <input
                placeholder="Mật khẩu"
                className="w-full transition focus-visible:outline-none"
              ></input>
            </div>
          </div>
          {/* log in */}
          <div className="pl-8 pr-8 mt-8">
            <button
              className=" bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600"
              onClick={() => {
                alert("đăng nhập thành công");
              }}
            >
              Đăng nhập với mật khẩu
            </button>
          </div>
      
          {/* quên mật khẩu */}
          <div className="pl-8 pr-8 mt-10 text-center">
            <Link className="hover:underline mr-5" href="/auth/sign-up">
              Quên mật khẩu
            </Link>
            <Link
              className="border border-blue-100 text-blue-500 w-full p-3  hover:underline"
              href="/auth/sign-up"
            >
              Đăng ký tài khoản
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
