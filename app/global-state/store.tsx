import { create } from "zustand";
import { MessageItemProps, TypeMessage } from "../types";

interface BearState {
  isOpenConversationInfo: boolean;
  setOpenConversationInfo: () => void;
  userPhone: string;
  user: any;
  msgList: MessageItemProps[];
  setMsgList: (message: MessageItemProps) => void;
  setUser: (user: any) => void;
  setUserPhone: (phone: string) => void;
  countFriendRequest: number;
  setCountFriendRequest: (count: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  isOpenConversationInfo: false,
  userPhone: "",
  user: null,
  msgList: [
    {
      idMessageDetail: "id1",
      idSender: "84704462651",
      idConversation: "1",
      type: TypeMessage.TEXT,
      content: "This is a text message",
      dateTime: new Date(2023, 11, 19, 10, 20, 30),
      isRemove: false,
    },
    {
      idMessageDetail: "id2",
      idSender: "84355887042",
      idConversation: "1",
      type: TypeMessage.FILE,
      content:
        "https://demo-s3-bucket-iuh.s3.ap-southeast-1.amazonaws.com/Tao_XacMinh_ChuKy.docx",
      dateTime: new Date(2023, 12, 25, 15, 30, 10),
      isRemove: false,
    },
  ],
  setMsgList: (message: MessageItemProps) => {
    set((prevState) => ({
      ...prevState,
      msgList: [...prevState.msgList, message],
    }));
  },
  setUser: (user: any) =>
    set((prevState) => ({
      ...prevState,
      user,
    })),
  setUserPhone: (userPhone: string) =>
    set((prevState) => ({
      ...prevState,
      userPhone,
    })),
  setOpenConversationInfo: () =>
    set((prevState) => ({
      ...prevState,
      isOpenConversationInfo: !prevState.isOpenConversationInfo,
    })),

  countFriendRequest: 0,
  setCountFriendRequest: (count: number) =>
    set((prevState) => ({
      ...prevState,
      countFriendRequest: count,
    })),
}));
