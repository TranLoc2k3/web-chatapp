import { create } from "zustand";

interface BearState {
  isOpenConversationInfo: boolean;
  setOpenConversationInfo: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  isOpenConversationInfo: false,
  setOpenConversationInfo: () =>
    set((prevState) => ({
      ...prevState,
      isOpenConversationInfo: !prevState.isOpenConversationInfo,
    })),
}));
