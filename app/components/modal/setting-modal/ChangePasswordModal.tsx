import { useEffect, useRef, useState } from "react";
import { userAPI } from "@/api/userAPI";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
type propTypes = {
  onClose: () => void;
  // userPhone:string;
};
const ChangePassWordModal: React.FC<propTypes> = ({ onClose }) => {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  //  lấy thông tin user từ session
  // const userPhone = useSession().data?.token?.user;
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const { data: session, status } = useSession();
  // xử lý reload khi thay đổi password.
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.token.user) {
        setError("");
      }
    }
  },[session,status]);

  const handleChangePassword = async () => {
    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    console.log(currentPassword);
    // console.log(userPhone)
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const resChangePassword = await userAPI.changePassword(
        session?.token.user,
        currentPassword,
        newPassword
      );

      if (resChangePassword.data.message === "Old password is incorrect") {
        setError("Mật khẩu cũ phải giống mật khẩu hiện tại");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Mật khẩu không trùng khớp");
        return;
      }
      toast({
        title: "Thông báo",
        description: "Thay đổi mật khẩu thành công",
        duration: 2000,
        // variant: "destructive",
      });
      setDeffaultValue();
    } catch (error) {
      setError("Đã xảy ra lỗi khi thực hiện thay đổi mật khẩu");
      return error;
    }
  };
  const setDeffaultValue = () => {
    setError("");
  };
  const handleSearchClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };
  return (
    <div>
      <h1 className="text-[20px]">Tạo Mật khẩu mới</h1>
      <div className="p-4">
        <div className="mt-2">
          <span className="font-bold">Lưu ý </span>
          Mật khẩu bao gồm các số ký tự đặc biệt tối thiểu 8 ký tự trở lên
        </div>
        {error && <div className="text-red-500">{error}</div>}

        <div
          className="mt-4"
          onClick={() => handleSearchClick(currentPasswordRef)}
        >
          <span>Mật khẩu hiện tại </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={currentPasswordRef}
              type="password"
              className="w-full"
              placeholder="Mật khẩu hiện tại"
            />
          </div>
        </div>
        <div className="mt-4" onClick={() => handleSearchClick(newPasswordRef)}>
          <span>Mật khẩu mới </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={newPasswordRef}
              type="password"
              className="w-full"
              placeholder="Mật khẩu mới"
            />
          </div>
        </div>
        <div
          className="mt-4"
          onClick={() => handleSearchClick(confirmPasswordRef)}
        >
          <span>Nhập lại mật khẩu mới </span>
          <div className="flex p-4 border-2 mt-4">
            <input
              ref={confirmPasswordRef}
              type="password"
              className="w-full"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-8 mt-6">
        <button
          type="button"
          className="px-8 py-2 bg-slate-200 hover:bg-slate-300 rounded-md"
          onClick={() => {
            onClose();
            setError("");
          }}
        >
          Huỷ
        </button>
        <button
          type="button"
          className="ml-4 px-8 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white"
          onClick={handleChangePassword}
        >
          Cập nhât
        </button>
      </div>
    </div>
  );
};

export default ChangePassWordModal;
