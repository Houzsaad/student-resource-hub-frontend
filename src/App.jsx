import { Routes, Route } from "react-router-dom";

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
import ResourceDetail from "./components/ResourceDetail";

function App(){

    return(
        <Layout>
                <Routes>
                    <Route path="/" element={<ResourceList />} />
                    <Route path="/resources" element={ <ResourceList />} />
                    <Route path="/register" element={ <RegisterForm />} />
                    <Route path="/login" element={ <LoginForm />} />
                    <Route path="/upload" element={ <UploadForm />} />

                    <Route path="/resources/:id" element={<ResourceDetail />} />
                </Routes>
        </Layout>
    )

}
export default App;