import ResourceCard from "./components/ResourceCard";
import ProfileCard from "./components/ProfileCard";
import AgeCounter from "./components/AgeCounter";
import LoginForm from "./components/LoginForm";
import LikeButton from "./components/LikeButton";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import ResourceList from "./components/ResourceList";

function App(){

    return(
        <Layout>
            <ResourceCard 
                title = "React Note"
                subject = "Frontend"
                category = "Not Study"
                createdAt = "2026-29-05"
                author = "Houzsaad"
            />     
            <ResourceList />      
           
        </Layout>
    )

}
export default App;