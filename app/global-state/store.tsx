import { create } from "zustand";
import { MessageItemProps, TypeMessage } from "../types";

interface BearState {
  isOpenConversationInfo: boolean;
  setOpenConversationInfo: () => void;
  userPhone: string;
  user: any;
  setUser: (user: any) => void;
  senders: any;
  setSenders: (senders: any) => void;
  setUserPhone: (phone: string) => void;
  countFriendRequest: number;
  setCountFriendRequest: (count: number) => void;
  conversations: any;
  setConversations: (conversations: any) => void;
  // Số lượng message đang được gửi đi
  sendingCount: number;
  setSendingCount: (count: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  isOpenConversationInfo: false,
  userPhone: "",
  user: null,
  senders: [],
  setSenders: (senders: any) =>
    set((prevState) => ({
      ...prevState,
      senders,
    })),
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
  conversations: [],
  setConversations: (conversations: any) =>
    set((prevState) => ({
      ...prevState,
      conversations,
    })),
  sendingCount: 0,
  setSendingCount: (count: number) =>
    set((prevState) => ({
      ...prevState,
      sendingCount: count,
    })),
}));
