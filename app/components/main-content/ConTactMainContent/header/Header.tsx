import { Contact } from "lucide-react";
interface HeaderWithIconProps {
    icon: JSX.Element;
    title: string;
  }
  const Header: React.FC<HeaderWithIconProps> = ({ icon, title }) => {
  return <div className="flex flex-row border-b-2 pl-5 pt-4 pb-4">
    {icon}
    <h1 className="ml-2">{title}</h1>
  </div>;
}

export default Header;
