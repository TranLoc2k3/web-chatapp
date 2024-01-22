import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MessageList from "./components/MessageList";

function MessageTabContent() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="bg-white gap-3 px-4">
        <TabsTrigger
          className="data-[state=active]:bg-transparent data-[state=active]:text-[#005AE0] 
          border-b-2 border-b-transparent data-[state=active]:border-b-[#005AE0] p-0 rounded-none"
          value="account"
        >
          Tất cả
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-transparent data-[state=active]:text-[#005AE0] 
          border-b-2 border-b-transparent data-[state=active]:border-b-[#005AE0] p-0 rounded-none"
          value="password"
        >
          Chưa đọc
        </TabsTrigger>
      </TabsList>
      <Separator />
      <div>
        <TabsContent className="mt-0" value="account">
          <MessageList />
        </TabsContent>
        <TabsContent className="mt-0" value="password">
          <MessageList />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default MessageTabContent;
