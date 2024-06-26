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
var react_1 = require("react");
var FriendRequestItem_1 = require("./FriendRequestItem");
var userAPI_1 = require("@/api/userAPI");
var store_1 = require("@/app/global-state/store");
var react_2 = require("next-auth/react");
function FriendRequestContent() {
    var _this = this;
    var _a, _b, _c, _d;
    var countFriendRequest = store_1.useBearStore(function (state) { return state.countFriendRequest; });
    var _e = react_1.useState([]), friendRequest = _e[0], setFriendRequest = _e[1];
    var userPhone = (_b = (_a = react_2.useSession().data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.user;
    var session = react_2.useSession();
    console.log(session);
    react_1.useEffect(function () {
        var getAllFriendRequests = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, userAPI_1.userAPI.getAllFriendRequests("/user/get-all-friend-requests/" + ((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.user))];
                    case 1:
                        res = _c.sent();
                        setFriendRequest(res);
                        return [2 /*return*/];
                }
            });
        }); };
        getAllFriendRequests();
    }, [countFriendRequest, (_d = (_c = session.data) === null || _c === void 0 ? void 0 : _c.token) === null || _d === void 0 ? void 0 : _d.user]);
    return (React.createElement("div", null,
        React.createElement("h2", null, "L\u1EDDi m\u1EDDi \u0111\u00E3 nh\u1EADn (" + countFriendRequest + ")"),
        friendRequest.map(function (item) { return (React.createElement(FriendRequestItem_1["default"], { id: item.id, key: item.id, receiverId: item.receiverId, senderId: item.senderId, avatar: item.sender.urlavatar, fullname: item.sender.fullname, sendedDate: item.createdAt })); })));
}
exports["default"] = FriendRequestContent;
