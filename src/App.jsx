
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
import Rating from "./components/Rating";

import { AuthProvider, PrivateRoute } from "./context/AuthContext";

function App(){

    return(
        <Layout>
                <Routes>
                    <Route path="/" element={<ResourceList />} />
                    <Route path="/resources" element={ <ResourceList />} />
                    <Route path="/register" element={ <RegisterForm />} />
                    <Route path="/login" element={ <LoginForm />} />
                    <Route path="/resources/:id" element={ <ResourceDetail /> } />

                    <Route path="/download" element={<DownloadResource />} />
                    <Route path="/shimmer" element={<ShimmerCard />} />

                    <Route path="/upload" element={ <PrivateRoute><UploadForm /></PrivateRoute> } />
                    
                    <Route path="/Profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />

                    <Route path="/resources/:id/edit" element={ <PrivateRoute><EditResource /></PrivateRoute> } />

                    <Route path="/Rating" element={ <PrivateRoute><Rating /></PrivateRoute> } />

                </Routes>
        </Layout>
    )

}

export default App;