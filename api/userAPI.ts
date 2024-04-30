import { axiosClient } from "@/configs/axios.config";
import axios from "axios";
import { get } from "http";
import { url } from "inspector";
import { use } from "react";

const userAPI = {
  onSignUp: (
    url: string,
    { username, password }: { username: string; password: string }
  ) =>
    axiosClient.post(url, {
      username,
      password,
    }),
  updateUserInfo: (
    url: string,
    {
      fullname,
      image,
      birthday,
      sex,
    }: { fullname: string; image: File; birthday: string; sex: string }
  ) =>
    axiosClient.post(
      url,
      {
        fullname,
        image,
        birthday,
        sex,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  onSignIn: (username: string, password: string) =>
    axiosClient.post("/auth/sign-in", {
      username,
      password,
    }),
  getUserByPhone: (url: string) =>
    axiosClient.get(`${url}`).then((res) => res.data),
  resetPassword: (
    url: string,
    { username, newpassword }: { username: string; newpassword: string }
  ) =>
    axiosClient.patch(url, {
      username,
      newpassword,
    }),
  getAllFriendRequests: (url: string) =>
    axiosClient.get(`${url}`).then((res) => res.data),

  handleFriendRequest: (payload: { id: string; type: string }) =>
    axiosClient.post("/user/process-friend-request", payload),

  changePassword: (
    username: string,
    oldpassword: string,
    newpassword: string
  ) => {
    return axiosClient.patch("/auth/update-password", {
      username,
      oldpassword,
      newpassword,
    });
  },
  getFriendListByUserID: (username: string) => {
   
      const res=axiosClient.post("/conversation/get-list-friend",{
        username
      })
      return res;
    
  },
  onUpdateGroupInfo: async (
    
    IDConversation: string,
    groupName: string,
    groupAvatar: File
  )=>{
    try {
      const formData= new FormData();
      formData.append("IDConversation",IDConversation);
      formData.append("groupName",groupName);
      formData.append("groupAvatar",groupAvatar);
      const res= await axiosClient.post("/conversation/update-info-group",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      return res;
    } catch (error) {
      console.error("Error updating group info:", error);
    }
  }
};

export { userAPI };
