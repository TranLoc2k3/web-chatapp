import { Button } from "@/components/ui/button";
import { EmptyUI } from "../AlbumShared/Album";
import SectionWrapper from "../SectionWrapper";
import FileList from "./FileList";

function FileShared() {
  return (
    <div>
      <SectionWrapper title="File">
        <div>
          {/* <EmptyUI /> */}
          <FileList />
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

export default FileShared;
