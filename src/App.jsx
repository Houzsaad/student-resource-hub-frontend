import ResourceCard from "./components/ResourceCard";
import ProfileCard from "./components/ProfileCard";
import AgeCounter from "./components/AgeCounter";
import LoginForm from "./components/LoginForm";
import LikeButton from "./components/LikeButton";
import Navbar from "./components/Navbar";


function App(){

    return(
        <div>

             <Navbar />
            <h1>Student Resource Hub</h1>

            {/* <ResourceCard 
                title = "React Note"
                subject = "Frontend"
                category = "Not Study"
                createdAt = "2026-29-05"
                author = "Houzsaad"
            /> */}

            <ResourceCard 
                title = "React Note"
                subject = "Frontend"
                category = "Not Study"
                createdAt = "2026-29-05"
                author = "Houzsaad"
            />

            <ProfileCard />
            <AgeCounter />
            <LoginForm />
            <LikeButton />
           
        </div>
    )

}
export default App;