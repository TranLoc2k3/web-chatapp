"use strict";
exports.__esModule = true;
exports.userAPI = void 0;
var axios_config_1 = require("@/configs/axios.config");
var userAPI = {
    onSignUp: function (url, _a) {
        var username = _a.username, password = _a.password;
        return axios_config_1.axiosClient.post(url, {
            username: username,
            password: password
        });
    },
    updateUserInfo: function (url, _a) {
        var fullname = _a.fullname, image = _a.image, birthday = _a.birthday, sex = _a.sex;
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
    onSignIn: function (username, password) {
        return axios_config_1.axiosClient.post("/auth/sign-in", {
            username: username,
            password: password
        });
    },
    getUserByPhone: function (url) {
        return axios_config_1.axiosClient.get("" + url).then(function (res) { return res.data; });
    },
    resetPassword: function (url, _a) {
        var username = _a.username, newpassword = _a.newpassword;
        return axios_config_1.axiosClient.patch(url, {
            username: username,
            newpassword: newpassword
        });
    },
    getAllFriendRequests: function (url) {
        return axios_config_1.axiosClient.get("" + url).then(function (res) { return res.data; });
    },
    handleFriendRequest: function (payload) {
        return axios_config_1.axiosClient.post("/user/process-friend-request", payload);
    },
    changePassword: function (username, oldpassword, newpassword) {
        return axios_config_1.axiosClient.patch("/auth/update-password", {
            username: username,
            oldpassword: oldpassword,
            newpassword: newpassword
        });
    }
};
exports.userAPI = userAPI;
