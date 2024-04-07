"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ChangePassWordModal = function (_a) {
    var onClose = _a.onClose;
    var currentPasswordRef = react_1.useRef(null);
    var newPasswordRef = react_1.useRef(null);
    var confirmPasswordRef = react_1.useRef(null);
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
            React.createElement("button", { type: "button", className: "px-8 py-2 bg-slate-200 hover:bg-slate-300 rounded-md", onClick: onClose }, "Hu\u1EF7"),
            React.createElement("button", { type: "button", className: "ml-4 px-8 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-white" }, "C\u1EADp nh\u00E2t"))));
};
exports["default"] = ChangePassWordModal;
