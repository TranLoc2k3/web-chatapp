  export enum TYPE_GROUP {
    SIGNLE = "single",
    GROUP = "group",
  }

  export enum TypeMessage {
    FILE = "file",
    TEXT = "text",
    VIDEO = "video",
    IMAGE = "image",
    LINK = "link",
  }

  export interface UserProps {
    ID: string;
    username: string;
    password: string;
    fullname: string;
    ismale: boolean;
    phone: string;
    urlavatar: string;
    birthday: string;
    friendList: string[];
    isOwner?: boolean;
    isCoOwner?: boolean;
  }

  export interface MessageItemProps {
    IDMessageDetail: string;
    IDConversation: string;
    IDSender: string;
    type: TypeMessage;
    content: string;
    dateTime: string;
    isRemove: boolean;
    isRecall: boolean;
    userSender?: any;
    isReply?: boolean;
  }

export interface ConversationItemProps {
  IDConversation: string;
  IDSender: string;
  groupMembers: any;
  IDNewestMessage: string;
  IDReceiver?: string;
  isGroup: boolean;
  listFile?: any;
  listImage?: any;
  groupName?: string;
  groupAvatar?: string;
  Receiver?: any;
}
