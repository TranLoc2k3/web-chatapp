"use strict";
exports.__esModule = true;
var Header_1 = require("@/app/components/main-content/ConTactMainContent/header/Header");
var lucide_react_1 = require("lucide-react");
function FriendList(_a) {
    var children = _a.children;
    return (React.createElement("div", null,
        React.createElement(Header_1["default"], { icon: React.createElement(lucide_react_1.Contact, null), title: "Danh s\u00E1ch b\u1EA1n b\u00E8" }),
        React.createElement("div", null,
            React.createElement("h1", null, "Hello"))));
}
exports["default"] = FriendList;
