/* eslint-disable @next/next/no-img-element */
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
var userAPI_1 = require("@/api/userAPI");
var button_1 = require("@/components/ui/button");
var separator_1 = require("@/components/ui/separator");
var utils_1 = require("@/lib/utils");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
var react_1 = require("react");
var react_phone_input_2_1 = require("react-phone-input-2");
require("react-phone-input-2/lib/style.css");
var socket_1 = require("@/configs/socket");
var toaster_1 = require("@/components/ui/toaster");
var use_toast_1 = require("@/components/ui/use-toast");
var store_1 = require("@/app/global-state/store");
var AddFriendModal = function (_a) {
    var isvisible = _a.isvisible, onClose = _a.onClose;
    var _b = react_1.useState(""), phone = _b[0], setPhone = _b[1];
    var _c = react_1.useState(null), user = _c[0], setUser = _c[1];
    var _d = react_1.useState(false), isHoverX = _d[0], setIsHoverX = _d[1];
    var userPhone = store_1.useBearStore(function (state) { return state.userPhone; });
    var toast = use_toast_1.useToast().toast;
    var handleFindUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userAPI_1.userAPI.getUserByPhone("/user/get-user/" + phone)];
                case 1:
                    res = _a.sent();
                    setUser(res);
                    return [2 /*return*/];
            }
        });
    }); };
    var onKeyDown = function (e) {
        if (e.key === "Enter") {
            handleFindUser();
        }
    };
    var handleSendRequest = function () {
        if (!user)
            return;
        var payload = {
            senderId: userPhone,
            receiverId: user.ID
        };
        socket_1.socket.emit("new friend request client", payload);
        socket_1.socket.on("send friend request server", function (res) {
            if ((res === null || res === void 0 ? void 0 : res.code) === 1) {
                toast({
                    title: "Gửi lời mời kết bạn",
                    description: "Đã gửi lời mời kết bạn thành công",
                    duration: 2000,
                    variant: "default"
                });
            }
            else if ((res === null || res === void 0 ? void 0 : res.code) === 0) {
                toast({
                    title: "Gửi lời mời kết bạn",
                    description: "Lời mời kết bạn đã được gửi trước đó",
                    duration: 2000,
                    variant: "default"
                });
            }
            else if ((res === null || res === void 0 ? void 0 : res.code) === 2) {
                toast({
                    title: "Gửi lời mời kết bạn",
                    description: "Đã có trong danh sách bạn bè",
                    duration: 2000,
                    variant: "default"
                });
            }
        });
        setPhone("");
        setUser(null);
        onClose();
    };
    return (React.createElement(framer_motion_1.AnimatePresence, null,
        isvisible && (React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1 }, className: "fixed inset-0 bg-black w-full bg-opacity-25 flex justify-center z-50" },
            React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
                React.createElement("div", { className: "bg-white  h-[570px] w-[400px] mt-[50px]  rounded-sm border-b  relative" },
                    React.createElement("div", { className: "p-4 text-black border-b-2 relative" },
                        React.createElement("h2", null, "Th\u00EAm b\u1EA1n"),
                        React.createElement("button", { className: "absolute top-[20px] right-[20px]" },
                            React.createElement(lucide_react_1.X, { onClick: function () {
                                    setPhone("");
                                    setUser(null);
                                    onClose();
                                } }))),
                    React.createElement("div", { className: "p-4 flex gap-3" },
                        React.createElement(react_phone_input_2_1["default"], { inputClass: "flex-1 !w-full", country: "vn", value: phone, onChange: function (phone) { return setPhone(phone); }, onKeyDown: onKeyDown }),
                        React.createElement(button_1.Button, { onClick: handleFindUser, variant: "outline", className: "h-[35px]" }, "T\u00ECm ki\u1EBFm")),
                    user && (React.createElement("div", { className: " text-black " },
                        React.createElement("p", { className: "pl-4 pt-2 text-neutral-600 text-[12px]" }, "K\u1EBFt qu\u1EA3"),
                        React.createElement("div", { className: utils_1.cn("p-4 pt-2 pb-2 flex mt-2 text-[12px] relative hover:bg-slate-200 w-full rounded-lg cursor-pointer "), onMouseEnter: function () { return setIsHoverX(true); }, onMouseLeave: function () { return setIsHoverX(false); } },
                            React.createElement(image_1["default"], { src: "" + user.urlavatar, width: 40, height: 40, className: "rounded-full h-10", alt: "" }),
                            React.createElement("div", { className: "ml-3" },
                                React.createElement("h2", { className: "text-sm font-[500]" }, "" + user.fullname),
                                React.createElement("p", null, "+" + phone)),
                            isHoverX && (React.createElement("div", { className: "absolute top-4 right-4 " },
                                React.createElement(lucide_react_1.X, { className: "w-5" })))))),
                    React.createElement("div", { className: "mt-4 text-black " }),
                    React.createElement("div", { className: "mt-[100px] h-[80px] absolute bottom-0 left-0 right-0" },
                        React.createElement(separator_1.Separator, { className: "w-full" }),
                        React.createElement("button", { className: "bg-slate-200 rounded-sm pl-4 pr-4 pt-2 pb-2  text-neutral-500 absolute top-5 right-[130px] hover:bg-slate-300", onClick: function () {
                                setPhone("");
                                setUser(null);
                                onClose();
                            } }, "Hu\u1EF7"),
                        React.createElement("button", { onClick: handleSendRequest, className: "rounded-sm pl-4 pr-4 pt-2 pb-2 bg-blue-600 hover:bg-blue-800 text-white absolute top-5 right-2 " }, "K\u1EBFt b\u1EA1n")))))),
        React.createElement(toaster_1.Toaster, null)));
};
exports["default"] = AddFriendModal;
