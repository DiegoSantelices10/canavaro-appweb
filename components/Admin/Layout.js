import AccessMenu from "components/Admin/AccessMenu";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full lg:flex bg-slate-50">
      <Head>
        <title>Canavaro Admin</title>
      </Head>

      {/* Sidebar - Fixed width on Desktop, Hidden on Mobile to prevent layout shifts */}
      <div className="hidden lg:block lg:w-64 lg:h-screen lg:fixed lg:left-0 lg:top-0 z-30">
        <AccessMenu />
      </div>

      {/* Mobile Header is handled inside AccessMenu as fixed element */}
      <div className="lg:hidden">
        <AccessMenu />
      </div>

      <Toaster position="top-right" />

      {/* Main Content - Offset by sidebar on Desktop */}
      <main className="lg:ml-64 bg-green-100 w-full p-4 md:p-6 pt-24 lg:pt-10">
        <div className="w-full lg:max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
