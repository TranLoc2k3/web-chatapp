import Image from "next/image";

function FileItem() {
  return (
    <div className="px-4 flex gap-2 h-16 items-center cursor-pointer hover:bg-[#f3f5f6]">
      <Image
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c17222b2-5747-4eb9-b22d-1b1a59e67256/dei7mi7-61341585-9e7c-4323-b9b2-6315c72d4cfc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxNzIyMmIyLTU3NDctNGViOS1iMjJkLTFiMWE1OWU2NzI1NlwvZGVpN21pNy02MTM0MTU4NS05ZTdjLTQzMjMtYjliMi02MzE1YzcyZDRjZmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0w8QjTsCXGiuKmoTxGyC1ZE6rk3iwRfiIEVzE_iwJe0"
        alt=""
        width={40}
        height={40}
      />
      <div className="flex-1 flex flex-col gap-[6px]">
        <span className="text-sm text-[#081C36] font-[600]">File name</span>
        <p className="text-[#7589A3] text-xs flex justify-between items-center">
          <span>982 B</span>
          <span>Hôm nay</span>
        </p>
      </div>
    </div>
  );
}

export default FileItem;
