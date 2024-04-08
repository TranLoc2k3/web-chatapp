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
var userAPI_1 = require("@/api/userAPI");
var use_toast_1 = require("@/components/ui/use-toast");
var ChangePassWordModal = function (_a) {
    var onClose = _a.onClose;
    var currentPasswordRef = react_1.useRef(null);
    var newPasswordRef = react_1.useRef(null);
    var confirmPasswordRef = react_1.useRef(null);
    var _b = react_1.useState(""), error = _b[0], setError = _b[1];
    var toast = use_toast_1.useToast().toast;
    var handleChangePassword = function () { return __awaiter(void 0, void 0, void 0, function () {
        var currentPassword, newPassword, confirmPassword, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    currentPassword = (_a = currentPasswordRef.current) === null || _a === void 0 ? void 0 : _a.value;
                    newPassword = (_b = newPasswordRef.current) === null || _b === void 0 ? void 0 : _b.value;
                    confirmPassword = (_c = confirmPasswordRef.current) === null || _c === void 0 ? void 0 : _c.value;
                    console.log(currentPassword);
                    // console.log(userPhone)
                    if (!currentPassword || !newPassword || !confirmPassword) {
                        setError("Vui lòng nhập đầy đủ thông tin");
                        return [2 /*return*/];
                    }
                    if (newPassword !== confirmPassword) {
                        setError("Mật khẩu không trùng khớp");
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userAPI_1.userAPI.changePassword("84329457746", currentPassword, newPassword)];
                case 2:
                    _d.sent();
                    toast({
                        title: "Thông báo",
                        description: "Vui lòng nhập đầy đủ thông tin",
                        duration: 2000,
                        variant: "destructive"
                    });
                    onClose();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    // console.log(error);
                    setError("Đã xảy ra lỗi khi thực hiện thay đổi mật khẩu");
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSearchClick = function (ref) {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (React.createElement("div", null,
        React.createElement("h1", { className: "text-[20px]" }, "T\u1EA1o M\u1EADt kh\u1EA9u m\u1EDBi"),
        React.createElement("div", { className: "p-4" },
            React.createElement("div", { className: "mt-2" },
                React.createElement("span", { className: "font-bold" }, "L\u01B0u \u00FD "),
                "M\u1EADt kh\u1EA9u bao g\u1ED3m c\u00E1c s\u1ED1 k\u00FD t\u1EF1 \u0111\u1EB7c bi\u1EC7t t\u1ED1i thi\u1EC3u 8 k\u00FD t\u1EF1 tr\u1EDF l\u00EAn"),
            error && React.createElement("div", { className: "text-red-500" }, error),
            React.createElement("div", { className: "mt-4", onClick: function () { return handleSearchClick(currentPasswordRef); } },
                React.createElement("span", null, "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i "),
                React.createElement("div", { className: "flex p-4 border-2 mt-4" },
                    React.createElement("input", { ref: currentPasswordRef, type: "password", className: "w-full", placeholder: "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i" }))),
            React.createElement("div", { className: "mt-4", onClick: function () { return handleSearchClick(newPasswordRef); } },
                React.createElement("span", null, "M\u1EADt kh\u1EA9u m\u1EDBi "),
                React.createElement("div", { className: "flex p-4 border-2 mt-4" },
                    React.createElement("input", { ref: newPasswordRef, type: "password", className: "w-full", placeholder: "M\u1EADt kh\u1EA9u m\u1EDBi" }))),
            React.createElement("div", { className: "mt-4", onClick: function () { return handleSearchClick(confirmPasswordRef); } },
                React.createElement("span", null, "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u m\u1EDBi "),
                React.createElement("div", { className: "flex p-4 border-2 mt-4" },
                    React.createElement("input", { ref: confirmPasswordRef, type: "password", className: "w-full", placeholder: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u m\u1EDBi" })))),
        React.createElement("div", { className: "flex justify-end pr-8 mt-6" },
            React.createElement("button", { type: "button", className: "px-8 py-2 bg-slate-200 hover:bg-slate-300 rounded-md", onClick: function () {
                    onClose();
                    setError("");
                } }, "Hu\u1EF7"),
            React.createElement("button", { type: "button", className: "ml-4 px-8 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white", onClick: handleChangePassword }, "C\u1EADp nh\u00E2t"))));
};
exports["default"] = ChangePassWordModal;
