import { create } from "zustand";

interface BearState {
  isOpenConversationInfo: boolean;
  setOpenConversationInfo: () => void;
  userPhone: string;
  user: any;
  setUser: (user: any) => void;
  setUserPhone: (phone: string) => void;
  countFriendRequest: number;
  setCountFriendRequest: (count: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  isOpenConversationInfo: false,
  userPhone: "",
  user: null,
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
