import ResourceCard from "./components/ResourceCard";
import ProfileCard from "./components/ProfileCard";
import AgeCounter from "./components/AgeCounter";
import LoginForm from "./components/LoginForm";
import LikeButton from "./components/LikeButton";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import ResourceList from "./components/ResourceList";
import RegisterForm from "./components/RegisterForm";
import UploadForm from "./components/UploadForm";

function App(){

    return(
        <Layout>

            <ResourceList />
            <RegisterForm />
            <LoginForm />
            <UploadForm />
           
        </Layout>
    )

}
export default App;