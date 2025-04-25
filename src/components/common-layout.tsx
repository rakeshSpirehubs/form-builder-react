import { Outlet } from "react-router-dom";
import Header from "./header";

const CommonLayout: React.FC = () => {
  return (
    <main className="h-screen w-full bg-gray-200 overflow-hidden pb-10">
      <div className="h-screen flex flex-col gap-10">
        <Header />
        <div className="container mx-auto pb-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default CommonLayout;
