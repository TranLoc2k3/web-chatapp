"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var ChangePasswordModal_1 = require("./setting-modal/ChangePasswordModal");
var GeneralModal_1 = require("./setting-modal/GeneralModal");
var tabs = [
    {
        id: "general",
        icon: react_1["default"].createElement(lucide_react_1.Settings, null),
        label: "Cài đặt Chung"
    },
    {
        id: "privacy",
        icon: react_1["default"].createElement(lucide_react_1.Lock, null),
        label: "Đổi mật khẩu"
    },
];
var InfoUserModal = function (_a) {
    var open = _a.open, onClose = _a.onClose, children = _a.children;
    var handleModalContentClick = function (e) {
        // Ngăn chặn sự lan truyền của sự kiện
        e.stopPropagation();
    };
    var _b = react_1.useState(true), toggeChangePassword = _b[0], setToggeChangePassword = _b[1];
    var _c = react_1.useState(""), currentTab = _c[0], setCurrentTab = _c[1];
    return (react_1["default"].createElement("div", { className: "fixed top-0 left-0 right-0 bottom-0 inset-0 flex  pt-[60px] pb-[60px] pl-[500px] items-center\n    transition-colors " + (open ? "visible bg-slate-800/20" : "invisible") + "\n    z-30", onClick: onClose },
        react_1["default"].createElement("div", { onClick: handleModalContentClick, className: "fixed top-0 left-0 right-0 bottom-0 inset-0 flex  pt-[60px] ml-[300px] pb-[60px]  \n    }\n    z-30" },
            react_1["default"].createElement("div", { className: "bg-neutral-50 p-4 border-r" },
                react_1["default"].createElement("h1", null, "C\u00E0i \u0111\u1EB7t"),
                react_1["default"].createElement("div", { className: "flex w-[300px] mt-4 " },
                    react_1["default"].createElement("div", { className: "w-[100%]" },
                        react_1["default"].createElement("div", { className: "" }, tabs.map(function (tab) { return (react_1["default"].createElement("div", { key: tab.id, className: "cursor-pointer hover:bg-neutral-200 flex p-3", onClick: function () { return setCurrentTab(tab.id); } },
                            tab.icon,
                            react_1["default"].createElement("h2", { className: "ml-2" }, tab.label))); }))))),
            react_1["default"].createElement("div", { className: "bg-white w-[45%] relative pt-9 p-6" },
                react_1["default"].createElement("div", null,
                    currentTab === "general" && react_1["default"].createElement(GeneralModal_1["default"], null),
                    currentTab === "privacy" && react_1["default"].createElement(ChangePasswordModal_1["default"], { onClose: onClose })),
                react_1["default"].createElement(lucide_react_1.X, { className: "absolute right-2 top-2 hover:bg-slate-200  cursor-pointer ", onClick: function () {
                        setCurrentTab("");
                        onClose();
                    } })))));
};
exports["default"] = InfoUserModal;
