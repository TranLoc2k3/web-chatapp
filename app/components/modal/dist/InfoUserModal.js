"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
var InfoUserModal = function (_a) {
    var open = _a.open, onClose = _a.onClose, children = _a.children, user = _a.user;
    return (react_1["default"].createElement("div", { className: "fixed inset-0 flex justify-center items-center \n    transition-colors " + (open ? "visible bg-black/20" : "invisible") + "\n    z-30", onClick: onClose },
        react_1["default"].createElement("div", { className: "bg-white rounded-lg shadow p-6 w-full\n        transition-all max-w-md \n        " + (open ? "scale-100 opacity-100" : "scale-110 opacitiy-0"), onClick: function (e) { return e.stopPropagation(); } },
            react_1["default"].createElement("div", { className: "header_InfoUserModal flex w-full pb-4" },
                react_1["default"].createElement("h3", { className: "font-bold" }, "Th\u00F4ng tin t\u00E0i kho\u1EA3n"),
                react_1["default"].createElement("button", { className: "absolute top-5 right-4 py-1 px-2 \r\n              border border-neutral-200 rounded-md text-gray-400\r\n              bg-white hover:bg-gray-50 hover:text-gray-600", onClick: onClose }, "X")),
            react_1["default"].createElement(image_1["default"], { src: user === null || user === void 0 ? void 0 : user.urlavatar, alt: "Thumnail User", height: 160, width: 100, className: "h-40 w-full object-cover" }),
            react_1["default"].createElement("span", { className: "block w-full h-px bg-gray-400 my-3" }),
            react_1["default"].createElement("div", { className: "flex items-center" },
                react_1["default"].createElement("div", { className: "Avatar relative inline-block" },
                    react_1["default"].createElement(image_1["default"], { width: 64, height: 64, src: user === null || user === void 0 ? void 0 : user.urlavatar, alt: "Avatar", className: "size-16 rounded-full m-2" }),
                    react_1["default"].createElement("div", { className: "absolute right-1 bottom-1 hover:bg-gray-200 rounded" },
                        react_1["default"].createElement(lucide_react_1.Camera, null))),
                react_1["default"].createElement("h4", { className: "name text-sm mx-2" }, user === null || user === void 0 ? void 0 : user.fullname),
                react_1["default"].createElement("div", { className: "edit-icon hover:bg-gray-200 rounded" },
                    react_1["default"].createElement(lucide_react_1.PenLine, { size: 12 }))),
            react_1["default"].createElement("span", { className: "block w-full h-px bg-gray-400 my-3" }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h4", { className: "my-2" }, "Th\u00F4ng tin c\u00E1 nh\u00E2n"),
                react_1["default"].createElement("div", { className: "text-sm" },
                    react_1["default"].createElement("div", { className: "flex my-1" },
                        react_1["default"].createElement("span", { className: "w-32" }, "Gi\u1EDBi t\u00EDnh"),
                        react_1["default"].createElement("p", null, (user === null || user === void 0 ? void 0 : user.ismale) ? "Nam" : "Nữ")),
                    react_1["default"].createElement("div", { className: "flex my-1" },
                        react_1["default"].createElement("span", { className: "w-32" }, "Ng\u00E0y sinh"),
                        react_1["default"].createElement("p", null, user === null || user === void 0 ? void 0 : user.birthday)),
                    react_1["default"].createElement("div", { className: "flex my-1" },
                        react_1["default"].createElement("span", { className: "w-32" }, "\u0110i\u1EC7n tho\u1EA1i"),
                        react_1["default"].createElement("p", null, user === null || user === void 0 ? void 0 : user.phone.replace(/^84/, "0"))))),
            react_1["default"].createElement("span", { className: "block w-full h-px bg-gray-400 my-3" }),
            react_1["default"].createElement("button", { type: "button", className: "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" }, "C\u1EADp nh\u1EADt"),
            children)));
};
exports["default"] = InfoUserModal;
