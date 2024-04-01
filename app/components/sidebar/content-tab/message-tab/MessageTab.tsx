import { set } from "date-fns";
import MessageTabContent from "./MessageTabContent";
import MessageTabHeader from "./MessageTabHeader";
import React, { useState } from "react";
const  MessageTab:React.FC=() =>{
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange =(value:string)=> { 
    setSearchTerm(value);
  }
  return (
    <div>
      {/* searchTerm lưu giá trị value từ search */}
      <MessageTabHeader searchTerm={searchTerm} onSearchChange={handleSearchChange}   />
      <MessageTabContent searchTerm={searchTerm}/>
    </div>
  );
}

export default MessageTab;
