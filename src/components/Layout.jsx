import Navbar from "./Navbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="layout-main">
        {children}
      </main>
    </>
  );
}

export default Layout;