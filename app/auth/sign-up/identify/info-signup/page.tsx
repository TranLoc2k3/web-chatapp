"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};
function InfoSignUp() {
  const route = useRouter();
  const quaylai = () => {
    route.push("/auth/sign-up/identify");
  };
  const hoantat = () => {
    route.push("/dashboard");
  };

  return (
    <div className="h-full w-full   bg-gradient-to-bl from-cyan-200 to-blue-400">
      <div className="flex justify-center h-[730px]">
        <div className="w-[600px] h-460px] bg-white mt-8 mb-8 rounded-3xl">
          {/* 1 cập nhật */}
          <div className="mt-[30px] flex justify-center flex-col items-center">
            <h2 className="font-bold">Cập nhật thông tin</h2>
            <div className="w-[100px] h-[100px] bg-blue-500 rounded-full flex justify-center items-center mt-2 cursor-pointer">
              <p className="justify-items-center text-white"> TV</p>
              {/* img */}
            </div>
          </div>
          {/* 2 input */}
          <div className=" flex flex-col  items-center mt-[50px] h-[300px]">
            <div className="rounded-2xl border-2 border-gray-300 p-2 bg-white mb-6">
              <input
                type="text"
                className="w-[400px]"
                placeholder="Tên của bạn"
              />
            </div>
            <div className="rounded-2xl border-2 border-gray-300 p-2 bg-white mb-6">
              {/* <input type="text" className="" placeholder="Giới tính" /> */}
              <select name="" id="" className="w-[400px] outline-0">
                <option value="Nam">Giới tính</option>
                <option value="">Nam</option>
                <option value="">Nữ</option>
              </select>
            </div>
            <div className="rounded-2xl border-2 border-gray-300 p-2 bg-white mb-6">
              <Space direction="vertical" className="">
                <DatePicker
                  style={{
                    width: "400px",
                    height: "30px",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    outline: "none",
                    borderRadius: "5px",
                  }}
                  onChange={onChange}
                />
              </Space>
            </div>
          </div>
          {/* 3 nút */}
          <div className="flex justify-end mr-[84px]">
            <Button
              variant="default"
              size="default"
              className="bg-slate-400 text-white w-[150px] h-[50px] p-3 rounded-md hover:bg-slate-300 mr-7"
              onClick={quaylai}
            >
              Quay lại
            </Button>
            <Button
              variant="default"
              size="default"
              className="bg-blue-500 text-white w-[150px] h-[50px] p-3 rounded-md hover:bg-blue-600"
              onClick={hoantat}
            >
              Hoàn tất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSignUp;
