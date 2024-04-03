"use client";
import { AlarmClock, AlertTriangle, EyeOff, LogOut, Trash } from "lucide-react";
import SectionWrapper, { SectionButton } from "../SectionWrapper";
import { Switch } from "@/components/ui/switch";
import { TYPE_GROUP } from "@/app/types";
import { iconStyle } from "@/app/utils/iconStyle";

interface IProps {
  typeGroup: TYPE_GROUP;
}

function SecuritySetting({ typeGroup }: IProps) {
  return (
    <div>
      <SectionWrapper title="Thiết lập bảo mật">
        <div>
          <SectionButton
            title="Tin nhắn tự xóa"
            icon={<AlarmClock {...iconStyle} />}
            subTitle={
              typeGroup === TYPE_GROUP.GROUP
                ? "Chỉ dành cho trường/phó nhóm"
                : "Không bao giờ"
            }
          />
          <SectionButton
            title="Ẩn trò chuyện"
            icon={<EyeOff {...iconStyle} />}
            rightIconList={[
              { icon: <Switch key="hidden-conversation" />, isDynamic: true },
            ]}
          />
          <SectionButton
            title="Báo xấu"
            icon={<AlertTriangle {...iconStyle} />}
          />
          <SectionButton
            title="Xóa lịch sử trò chuyện"
            icon={<Trash color="#EF4444" {...iconStyle} />}
            isDangerous={true}
          />
          {typeGroup === TYPE_GROUP.GROUP && (
            <SectionButton
              title="Rời nhóm"
              icon={
                <LogOut
                  width={22}
                  color="#EF4444"
                  height={22}
                  strokeWidth={1.5}
                />
              }
              isDangerous={true}
            />
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}

export default SecuritySetting;
