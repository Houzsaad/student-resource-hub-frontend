import Navbar from "./Navbar";
function Layout({ children }) {
    return (
        <>

            <h1>SRH_APP</h1>
                  
            <Navbar />
           
            <main>
                {children}
            </main>
        </>
    );
}
export default  Layout;