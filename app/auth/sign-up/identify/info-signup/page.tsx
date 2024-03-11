"use client";
import { userAPI } from "@/api/userAPI";
import DatePicker from "@/app/components/sign-up/DatePicker";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "FullName must be at least 2 characters.",
  }),
  image: z.any(),
  sex: z.string(),
  birthday: z.any(),
});
function InfoSignUp() {
  const route = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState<File>();
  const [date, setDate] = useState<Date>();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      image: undefined,
      sex: "male",
      birthday: undefined,
    },
  });

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.image = file as File;
    values.birthday = format(date as Date, "yyyy-MM-dd");
    // const res = await userAPI.updateUserInfo(
    //   `/auth/update-info/${searchParams.get("phone")}`,
    //   values as any
    // );
    // if (res.data.message == "Update information successfully") {
    //   route.push("/dashboard");
    // }
    console.log(values);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-bl from-cyan-200 to-blue-400 flex items-center justify-center">
      <div className="">
        <div className="bg-white h-auto w-[400px] flex items-center justify-center p-10">
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
                          src={previewImage || ""}
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
                      <DatePicker date={date} setDate={setDate} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Lưu</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default InfoSignUp;
