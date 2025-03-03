import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      {/* <Navigation /> */}
      <Outlet />
    </>
  );
};
export default RootLayout;
