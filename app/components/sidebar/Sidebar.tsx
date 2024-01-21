import ContentTab from "./content-tab/ContentTab";
import MainTab from "./main-tab/MainTab";

function Sidebar() {
  return (
    <div className="flex bg-white">
      {/* Left Content */}
      <MainTab />
      <ContentTab />
    </div>
  );
}

export default Sidebar;
