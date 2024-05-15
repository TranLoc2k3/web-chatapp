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
    return axiosClient.post("/conversation/get-list-friend", {
      username,
    });
  },
  onUpdateGroupInfo: async (
    IDConversation: string,
    groupName: string,
    groupAvatar: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("IDConversation", IDConversation);
      formData.append("groupName", groupName);
      formData.append("groupAvatar", groupAvatar);
      const res = await axiosClient.post(
        "/conversation/update-info-group",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Error updating group info:", error);
    }
  },
  onUnFriend: async (senderId: string, receiverId: string) => {
    try {
      const res = await axiosClient.post("/user/unfriend", {
        senderId,
        receiverId,
      });
      return res;
    } catch (error) {
      console.error("Error unfriending:", error);
    }
  },
  updateUserLocation: async (
    IDUser: string,
    longitude: number,
    latitude: number
  ) => {
    try {
      const res = await axiosClient.post("/map/update-location", {
        IDUser,
        longitude,
        latitude,
      });
      return res;
    } catch (error) {
      console.error("Error updating location:", error);
    }
  },
  getAllUserLocation: async () => {
    try {
      const res = await axiosClient.get("/map/get-all-location");
      return res;
    } catch (error) {
      console.error("Error getting all location:", error);
    }
  },
};

export { userAPI };
