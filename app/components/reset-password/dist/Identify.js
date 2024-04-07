/* eslint-disable react-hooks/exhaustive-deps */
"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var userAPI_1 = require("@/api/userAPI");
var use_toast_1 = require("@/components/ui/use-toast");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
require("react-phone-input-2/lib/style.css");
function Identify() {
    var _this = this;
    var _a = react_1.useState(""), password = _a[0], setPassword = _a[1];
    var _b = react_1.useState(""), confirmPassword = _b[0], setConfirmPassword = _b[1];
    var searchParams = navigation_1.useSearchParams();
    var route = navigation_1.useRouter();
    var toast = use_toast_1.useToast().toast;
    var onClickResetPassword = function () { return __awaiter(_this, void 0, void 0, function () {
        var payload, resUpdatePassword, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!password || !confirmPassword) {
                        toast({
                            title: "Đăng ký không thành công",
                            description: "Vui lòng nhập đầy đủ thông tin",
                            duration: 2000,
                            variant: "destructive"
                        });
                        return [2 /*return*/];
                    }
                    payload = {
                        username: searchParams.get("phone"),
                        newpassword: password
                    };
                    if (!(password === confirmPassword)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userAPI_1.userAPI.resetPassword("/auth/reset-password", payload)];
                case 2:
                    resUpdatePassword = _a.sent();
                    if (resUpdatePassword.data.message === "Password is the same") {
                        toast({
                            title: "Cập nhật mật khẩu",
                            description: "Mật khẩu mới phải khác mật khẩu cũ!",
                            duration: 2000,
                            variant: "destructive"
                        });
                    }
                    else if (resUpdatePassword.data.message === "Update password success") {
                        toast({
                            title: "Cập nhật mật khẩu",
                            description: "Cập nhật mật khẩu thành công!",
                            duration: 2000
                        });
                        route.push("/auth/sign-in");
                    }
                    else if (resUpdatePassword.data.message === "Update password failed") {
                        toast({
                            title: "Cập nhật mật khẩu",
                            description: "Cập nhật mật khẩu thất bại!",
                            duration: 2000,
                            variant: "destructive"
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    toast({
                        title: "Cập nhật không thành công",
                        description: "Có lỗi xảy ra khi gửi yêu cầu!",
                        duration: 2000,
                        variant: "destructive"
                    });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    toast({
                        title: "Cập nhật mật khẩu",
                        description: "Mật khẩu không khớp!",
                        duration: 2000,
                        variant: "destructive"
                    });
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!window.confirmationResult) {
        route.push("/auth/sign-up/");
        return;
    }
    return (React.createElement("div", { className: "bg-gradient-to-bl from-cyan-200 to-blue-400 h-screen w-screen flex justify-center  " },
        React.createElement("div", null,
            React.createElement("div", { className: "text-center mt-[50px]" },
                React.createElement("h1", { className: "text-blue-600 text-5xl font-bold " }, "Zalo"),
                React.createElement("h2", { className: "mt-2" },
                    "C\u1EADp nh\u1EADt m\u1EADt kh\u1EA9u TinTin ",
                    React.createElement("br", null),
                    "Th\u00F4ng tin b\u1EA3o m\u1EADt \u0111\u1EBFn v\u1EDBi l\u1EF1a ch\u1ECDn kh\u00E1ch h\u00E0ng")),
            React.createElement("div", { className: "bg-white w-[420px] mt-6 " },
                React.createElement("div", { className: "" },
                    React.createElement("h3", { className: "text-center p-4  border-b" }, "C\u1EADp nh\u1EADt m\u1EADt kh\u1EA9u")),
                React.createElement("div", { className: "pl-8 pr-8" },
                    React.createElement("div", { className: "flex mt-8 border-b pb-2" },
                        React.createElement("span", { className: "mr-4" },
                            React.createElement(lucide_react_1.Lock, null)),
                        React.createElement("input", { placeholder: "M\u1EADt kh\u1EA9u", className: "w-full transition focus-visible:outline-none", type: "password", onChange: function (e) { return setPassword(e.target.value); }, value: password, required: true }))),
                React.createElement("div", { className: "pl-8 pr-8" },
                    React.createElement("div", { className: "flex mt-8 border-b pb-2 " },
                        React.createElement("span", { className: "mr-4" },
                            React.createElement(lucide_react_1.PackageCheck, null)),
                        React.createElement("input", { placeholder: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", className: "w-full transition focus-visible:outline-none", type: "password", onChange: function (e) { return setConfirmPassword(e.target.value); }, value: confirmPassword, required: true }))),
                React.createElement("div", { className: "pl-8 pr-8 mt-8" },
                    React.createElement("button", { className: " bg-blue-500 text-white w-full p-3 rounded-full hover:bg-blue-600", onClick: onClickResetPassword }, "C\u1EADp nh\u1EADt m\u1EADt kh\u1EA9u")),
                React.createElement("div", { className: "pb-4 mt-3 text-center" },
                    React.createElement(link_1["default"], { href: "/auth/sign-up", className: "hover:underline" }, "Quay v\u1EC1"))))));
}
exports["default"] = Identify;
