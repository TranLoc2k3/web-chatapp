import ImageViewBox, { ViewBoxType } from "./ImageViewBox";

const arr = new Array(8).fill(0);

function ViewBoxWrapper() {
  return (
    <div className="flex flex-wrap px-4 gap-2">
      {arr.map((item, index) => (
        <ImageViewBox
          type={index % 2 ? ViewBoxType.IMAGE : ViewBoxType.VIDEO}
          key={index}
        />
      ))}
    </div>
  );
}

export default ViewBoxWrapper;
