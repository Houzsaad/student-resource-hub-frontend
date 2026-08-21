
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import authHearders from "./api";

import ResourceCard from "./components/ResourceCard";
import ProfileCard from "./components/ProfileCard";
import LoginForm from "./components/LoginForm";
import LikeButton from "./components/LikeButton";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import ResourceList from "./components/ResourceList";
import RegisterForm from "./components/RegisterForm";
import UploadForm from "./components/UploadForm";
import ResourceDetail from "./components/ResourceDetail";
import Profile from "./components/Profile";
import DownloadResource from "./components/DownloadResource";
import ShimmerCard from "./components/ShimmerCard";
import EditResource from "./components/EditResource";

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
                    
                    <Route path="/Profile" element={<Profile />} />

                    <Route path="/download" element={<DownloadResource />} />

                    <Route path="/shimmer" element={<ShimmerCard />} />

                    <Route path="/resources/:id/edit" element={<EditResource />} />

                </Routes>
        </Layout>
    )

}

export default App;