"use client";
import { ChevronDown, Lock, PackageCheck } from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
function SignUp() {
  const customInputStyle = {
    border: "1px solid #60a5fa",
    width: "100%",
  };
  const [phone, setPhone] = useState<string>("");
  const [result, setResult] = useState(false);
  const route = useRouter();

  // Xử lý xác thực
  const handleReliable = () => {
    setResult(true);
    route.push("/auth/sign-up/identify/info-signup");
  };
  return (
    <div className="bg-gradient-to-bl from-cyan-200 to-blue-400 h-screen w-screen flex justify-center  ">
      <div>
        <div className="text-center mt-[50px]">
          <h1 className="text-blue-600 text-5xl font-bold ">Zalo</h1>
          <h2 className="mt-2">
            Đăng ký tài khoản Zalo <br />
            Thông tin bảo mật đến với lựa chọn khách hàng
          </h2>
        </div>
        <div className="bg-white w-[420px] h-[400px] mt-6 ">
          <div className="">
            <h3 className="text-center p-4  border-b">Đăng ký tài khoản</h3>
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
                className="w-full transition focus-visible:outline-none "
              ></input>
            </div>
          </div>
          {/* confilm password */}
          <div className="pl-8 pr-8">
            <div className="flex mt-8 border-b pb-2 ">
              <span className="mr-4">
                <PackageCheck />
              </span>

              <input
                placeholder="Xác nhận mật khẩu"
                className="w-full transition  focus-visible:outline-none"
              ></input>
            </div>
          </div>
          {/* log in */}
          <div className="pl-8 pr-8 mt-8">
            <button
              className=" bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600"
              onClick={handleReliable}
            >
              Đăng ký tài khoản
            </button>
          </div>

          {/* quên mật khẩu */}
          <div className="pl-8 pr-8 mt-3 text-center">
            <Link href="/auth/sign-up" className="hover:underline">
              Quay về
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
