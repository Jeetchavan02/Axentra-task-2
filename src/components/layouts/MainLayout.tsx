import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden bg-gray-50 text-black w-full">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <Header children={children} /> */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* <div className="px-6 mx-auto py-4 "> */}
            <Outlet />
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;