/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Lock, PackageCheck } from "lucide-react";

import { userAPI } from "@/api/userAPI";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
function Identify() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const route = useRouter();
  const { toast } = useToast();
  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
    setIsPasswordValid(regex.test(value));
    setPassword(value);
  };
  const onClickSignUp = async () => {
    if (!isPasswordValid) {
      // Hiển thị thông báo lỗi nếu mật khẩu không hợp lệ
      console.log("Mật khẩu không hợp lệ");
      return;
    }
    if (!password || !confirmPassword) {
      toast({
        title: "Đăng ký không thành công",
        description: "Vui lòng nhập đầy đủ thông tin",
        duration: 2000,
        variant: "destructive",
      });
      return;
    }
    const payload = {
      username: searchParams.get("phone") as string,
      password,
    };
    if (password === confirmPassword) {
      try {
        const res = await userAPI.onSignUp("/auth/sign-up", payload);
        if (res.data.message == "Username existing") {
          toast({
            title: "Đăng ký không thành công",
            description: "Tài khoản đã tồn tại!",
            duration: 2000,
            variant: "destructive",
          });
        } else {
          route.push(
            `/auth/sign-up/identify/info-signup?phone=${searchParams.get(
              "phone"
            )}`
          );
        }
      } catch (error) {
        toast({
          title: "Đăng ký không thành công",
          description: "Có lỗi xảy ra khi gửi yêu cầu!",
          duration: 2000,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Đăng ký thất bại",
        description: "Xác nhận mật khẩu thất bại !",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  if (!window.confirmationResult) {
    route.push("/auth/sign-up/");
    return;
  }
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
        <div className="bg-white w-[420px] mt-6 ">
          <div className="">
            <h3 className="text-center p-4  border-b">Đăng ký tài khoản</h3>
          </div>
          {/* div check valid */}
          {!isPasswordValid && (
            <div className="pl-8 pr-8 mt-4 text-red-500">
              Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa,
              một chữ thường, một số và một ký tự đặc biệt.
            </div>
          )}
          {/* password */}
          <div className="pl-8 pr-8">
            <div className="flex mt-8 border-b pb-2">
              <span className="mr-4">
                <Lock />
              </span>

              <input
                placeholder="Mật khẩu"
                className="w-full transition focus-visible:outline-none"
                type="password"
                onChange={(e) => validatePassword(e.target.value)}
                value={password}
                required
              />
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
                className="w-full transition focus-visible:outline-none"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
          </div>
          {/* log in */}
          <div className="pl-8 pr-8 mt-8">
            <button
              className=" bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600"
              onClick={onClickSignUp}
            >
              Đăng ký tài khoản
            </button>
          </div>
          {/* quên mật khẩu */}
          <div className="pb-4 mt-3 text-center">
            <Link href="/auth/sign-up" className="hover:underline">
              Quay về
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Identify;
