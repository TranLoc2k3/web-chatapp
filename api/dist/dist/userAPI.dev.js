"use strict";

exports.__esModule = true;
exports.userAPI = void 0;

var axios_config_1 = require("@/configs/axios.config");

var userAPI = {
  onSignUp: function onSignUp(url, _a) {
    var username = _a.username,
        password = _a.password;
    return axios_config_1.axiosClient.post(url, {
      username: username,
      password: password
    });
  },
  updateUserInfo: function updateUserInfo(url, _a) {
    var fullname = _a.fullname,
        image = _a.image,
        birthday = _a.birthday,
        sex = _a.sex;
    return axios_config_1.axiosClient.post(url, {
      fullname: fullname,
      image: image,
      birthday: birthday,
      sex: sex
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  onSignIn: function onSignIn(username, password) {
    return axios_config_1.axiosClient.post("/auth/sign-in", {
      username: username,
      password: password
    });
  },
  getUserByPhone: function getUserByPhone(url) {
    return axios_config_1.axiosClient.get("" + url).then(function (res) {
      return res.data;
    });
  },
  updatePassword: function updatePassword(url, _a) {
    var username = _a.username,
        newpassword = _a.newpassword;
    return axios_config_1.axiosClient.patch(url, {
      username: username,
      newpassword: newpassword
    });
  },
  getAllFriendRequests: function getAllFriendRequests(url) {
    return axios_config_1.axiosClient.get("" + url).then(function (res) {
      return res.data;
    });
  },
  handleFriendRequest: function handleFriendRequest(payload) {
    return axios_config_1.axiosClient.post("/user/process-friend-request", payload);
  }
};
exports.userAPI = userAPI;