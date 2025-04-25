import { cn } from "@/lib/utils";
import { FilePlus2, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="py-3 px-8 bg-white h-18">
      <div className="container m-auto w-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Form Builder
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-1 cursor-pointer py-2 px-4 hover:bg-gray-200 rounded-sm",
              location.pathname === "/" && "bg-gray-200"
            )}
          >
            <List size={20} />
            <p className="text-sm">Form List</p>
          </Link>
          <Link
            to="/create-form"
            className={cn(
              "flex items-center gap-1 cursor-pointer py-2 px-4 hover:bg-gray-200 rounded-sm",
              location.pathname === "/create-form" && "bg-gray-200"
            )}
          >
            <FilePlus2 size={20} />
            <p className="text-sm">Create Form</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
