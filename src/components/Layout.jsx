import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-screen h-screen md:w-80 md:py-5  mx-auto overflow-hide">
      <Outlet />
    </div>
  );
}

export default Layout;
