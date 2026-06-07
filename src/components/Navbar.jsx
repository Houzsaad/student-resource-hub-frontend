import "./Navbar.css"
function Navbar({loading, search, error}){
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    // if (loading) return <p className="status">Loading...</p>;
    // if (error) return <p className="error">Error: {error}</p>

    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <a href="/home">Home</a>
                    <a href="/browse">Browse</a>
                    <a href="/upload">Upload</a>
                    <a href="profile">Profile</a>
                    
                    <button onClick={() => {
                        localStorage.removeItem("access_token");
                        window.location.href = "/login"
                    }}>Logout</button>
                </>
                ):(
                    <>
                        <a href="/home">Home</a>
                        <a href="/browse">Browse</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
            
        </nav>
    );
}

export default Navbar;