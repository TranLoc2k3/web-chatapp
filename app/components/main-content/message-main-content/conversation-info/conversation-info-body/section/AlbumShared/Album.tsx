import { Button } from "@/components/ui/button";
import SectionWrapper from "../SectionWrapper";
import ViewBoxWrapper from "./ViewBoxWrapper";

export const EmptyUI = () => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-[#7589A3] text-xs pb-3 font-medium">
        Chưa có Ảnh/Video được chia sẻ
      </p>
    </div>
  );
};

function Album() {
  return (
    <div>
      <SectionWrapper title="Ảnh/Video">
        <div>
          {/* <EmptyUI /> */}
          <ViewBoxWrapper />
        </div>
        <div className="px-4">
          <Button
            variant="outline"
            className="my-4 w-full h-8 bg-[#EAEDF0] hover:bg-[#DFE2E7]"
          >
            Xem tất cả
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default Album;
