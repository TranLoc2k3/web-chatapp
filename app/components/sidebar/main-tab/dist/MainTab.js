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
var store_1 = require("@/app/global-state/store");
var avatar_1 = require("@/components/ui/avatar");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var scroll_area_1 = require("@/components/ui/scroll-area");
var socket_1 = require("@/configs/socket");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var react_1 = require("next-auth/react");
var image_1 = require("next/image");
var react_2 = require("react");
var InfoUserModal_1 = require("../../modal/InfoUserModal");
var SettingModal_1 = require("../../modal/SettingModal");
var MainTabList_1 = require("./MainTabList");
function MainTab() {
    var _this = this;
    var _a, _b;
    var _c = react_2.useState(false), open = _c[0], setOpen = _c[1];
    var _d = react_2.useState(false), openSetting = _d[0], setOpenSetting = _d[1];
    var session = react_1.useSession();
    var setCountFriendRequest = store_1.useBearStore(function (state) { return state.setCountFriendRequest; });
    var _e = store_1.useBearStore(function (state) { return ({
        user: state.user,
        setUser: state.setUser
    }); }), user = _e.user, setUser = _e.setUser;
    var countFriendRequest = store_1.useBearStore(function (state) { return state.countFriendRequest; });
    var _f = react_2.useState(null), data = _f[0], setData = _f[1];
    function handleProfileClick() {
        setOpen(true);
    }
    function handleSettingClick() {
        setOpenSetting(true);
    }
    react_2.useEffect(function () {
        var _a, _b, _c, _d, _e;
        var getUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, userAPI_1.userAPI.getUserByPhone("/user/get-user/" + ((_a = session.data) === null || _a === void 0 ? void 0 : _a.token.user))];
                    case 1:
                        res = _b.sent();
                        setData(res);
                        return [2 /*return*/];
                }
            });
        }); };
        ((_a = session.data) === null || _a === void 0 ? void 0 : _a.token.user) && getUser();
        var getAllFriendRequests = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, e_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userAPI_1.userAPI.getAllFriendRequests("/user/get-all-friend-requests/" + ((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.user))];
                    case 1:
                        res = _c.sent();
                        if (res) {
                            setCountFriendRequest(res.length);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        getAllFriendRequests();
        ((_c = (_b = session.data) === null || _b === void 0 ? void 0 : _b.token) === null || _c === void 0 ? void 0 : _c.user) &&
            socket_1.socket.emit("new user connect", {
                phone: (_e = (_d = session.data) === null || _d === void 0 ? void 0 : _d.token) === null || _e === void 0 ? void 0 : _e.user
            });
        socket_1.socket.on("new friend request server", function (data) {
            if (data.code === 1) {
                setCountFriendRequest(countFriendRequest + 1);
            }
        });
        return function () {
            socket_1.socket.off("new friend request server");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.user]);
    react_2.useEffect(function () {
        setUser(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    if (session.status === "loading")
        return null;
    if (!data)
        return null;
    return (React.createElement("div", { className: "w-16 min-w-16 pt-8 bg-[#0091ff] h-dvh flex flex-col justify-between" },
        React.createElement(scroll_area_1.ScrollArea, { className: "h-full" },
            React.createElement("div", { className: "mb-8" },
                React.createElement(avatar_1.Avatar, { className: "size-12 mx-auto" },
                    React.createElement(dropdown_menu_1.DropdownMenu, null,
                        React.createElement(dropdown_menu_1.DropdownMenuTrigger, null,
                            React.createElement(image_1["default"], { src: "" + ((user === null || user === void 0 ? void 0 : user.urlavatar) || data.urlavatar), key: "u-avt-side-bar", alt: "", width: 48, height: 48, className: "h-12 rounded-full", priority: true }),
                            React.createElement(avatar_1.AvatarFallback, null, "CN")),
                        React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "ml-[68px] mt-[-30px] w-[300px]" },
                            React.createElement(dropdown_menu_1.DropdownMenuLabel, null, "My Account"),
                            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                            React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: handleProfileClick }, "Profile"),
                            React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: handleSettingClick }, "Setting"),
                            React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "border-t-2 mt-2", onClick: function () { return react_1.signOut({ callbackUrl: "/auth/sign-in" }); } }, "\u0110\u0103ng xu\u1EA5t"))))),
            React.createElement(MainTabList_1["default"], null)),
        React.createElement("ul", { className: utils_1.cn("*:flex *:justify-center *:items-center *:h-16 hover:*:bg-[rgba(0,0,0,0.1)] *:cursor-pointer") },
            React.createElement("li", null,
                React.createElement(lucide_react_1.Cloud, { color: "#FFF", width: 28, height: 28 })),
            React.createElement("li", null,
                React.createElement(lucide_react_1.Settings, { color: "#FFF", width: 28, height: 28 }))),
        data && (React.createElement(InfoUserModal_1["default"], { user: data, open: open, onClose: function () { return setOpen(false); } },
            React.createElement(React.Fragment, null))),
        data &&
            React.createElement(SettingModal_1["default"], { open: openSetting, onClose: function () { return setOpenSetting(false); } },
                React.createElement(React.Fragment, null))));
}
exports["default"] = MainTab;
