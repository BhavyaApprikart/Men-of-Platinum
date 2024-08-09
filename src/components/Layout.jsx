import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className=" w-screen h-screen md:min-h-screen md:w-[350px] md:py-1 mx-auto overflow-y-scroll scrollbar-hide md:overflow-hidden">
      <Outlet />
    </div>
  );
}

export default Layout;
