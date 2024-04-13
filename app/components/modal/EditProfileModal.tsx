import { userAPI } from "@/api/userAPI";
import { formSchema } from "@/app/auth/sign-up/identify/info-signup/page";
import DatePicker from "@/app/components/sign-up/DatePicker";
import { useBearStore } from "@/app/global-state/store";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IProps {
  fullname: string;
  sex: boolean;
  birthday: Date;
  phone: string;
  urlavatar: string;
  setIsOpen: (value: boolean) => void;
}
function EditProfile({
  fullname,
  sex,
  birthday,
  phone,
  urlavatar,
  setIsOpen,
}: IProps) {
  const [date, setDate] = useState<Date>(() => {
    if (!birthday) return new Date();
    return birthday;
  });
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useBearStore((state) => state.setUser);
  const [previewImage, setPreviewImage] = useState(urlavatar);
  const [file, setFile] = useState<File>();
  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname,
      image: undefined,
      sex: sex ? "male" : "female",
      birthday: undefined,
    },
  });

  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.image = file as File;
    values.birthday = format(date as Date, "yyyy-MM-dd");
    setIsLoading(true);
    const res = await userAPI.updateUserInfo(
      `/auth/update-info/${phone}`,
      values as any
    );
    if ((res.data.message = "Update information successfully")) {
      setIsLoading(false);

      setPreviewImage(res.data.data.urlavatar);
      setIsOpen(false);
      toast({
        title: "Thông báo",
        description: "Cập nhật thông tin thành công",
        duration: 2000,
        variant: "default",
      });
      setUser(res.data.data);
    }
  }

  const checkOnChange = () => {
    const values = form.getValues();
    const dateFormat =
      date != birthday
        ? date.getFullYear() +
          "-" +
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
        : birthday;
    const ismale = values.sex === "male";
    if (
      dateFormat !== birthday ||
      values.fullname !== fullname ||
      ismale !== sex ||
      file
    )
      return true;
    return false;
  };

  return (
    <Form {...form}>
      <form
        action=""
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex justify-center items-center">
              <FormLabel htmlFor="image" className="size-[100px]">
                <div className="relative size-[100px]">
                  <Image
                    key="avatar"
                    src={previewImage}
                    alt="image"
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  id="image"
                  className="hidden"
                  name="image"
                  onChange={onChangeImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-5"
                  name="sex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Nam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Nữ</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Ngày sinh</FormLabel>
              <FormControl>
                <DatePicker date={date} setDate={setDate as any} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            disabled={!checkOnChange()}
            className="flex gap-2"
            type="submit"
          >
            Lưu
            {isLoading && <LoaderIcon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default EditProfile;
