// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Signup from './pages/Signup/Signup';
import SignupConfirm from './pages/Signup/SignupConfirm';
import Signin from './pages/Signin/Signin';
import SendResetEmail from "./pages/PwdReset/SendResetEmail";
import EmailVerification from './pages/Signup/EmailVerification';
import PwdReset from './pages/PwdReset/PwdReset';
import Footer from './components/Footer/Footer';
import NotFound from './pages/Errors/NotFound';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import UserProfile from './pages/Dashboard/User/UserProfile';
import FavoritePosts from './pages/Dashboard/User/FavoritePosts';
import UserComments from './pages/Dashboard/User/UserComments';
import Contact from './pages/Contact/Contact';
import BlogHome from './pages/Blog/BlogHome';
import RecentPosts from './pages/Blog/RecentPosts';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Route, Routes } from 'react-router';
import RoleBasedRoute from './components/Routes/RoleBasedRoute';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { useAuthContext } from './hooks/auth/useAuthContext';
import Post from './pages/Blog/Post';
import Category from './pages/Blog/Category';
import { categories, postsThumbnails } from './pages/Blog/Posts/mockData';
// import { StyledEngineProvider } from '@mui/material/styles';

function App() {

    return (
        <div className="main-app">
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-success" element={<SignupConfirm />} />
                <Route path="/email-verification" element={<EmailVerification />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/send-reset-email" element={<SendResetEmail />} />
                <Route path="/password-reset" element={<PwdReset />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<BlogHome />} >
                    <Route index element={<RecentPosts />} />
                    <Route path="recent-posts" element={<RecentPosts />} />
                    {
                        categories.map((category, index) => (
                            <Route key={index} path={category.replace(/ /g, "-")}  >
                                <Route index key={index} element={<Category category={category} />}/>
                                {
                                    postsThumbnails.map((post, index) => (
                                        post.category === category && 
                                        <Route key={index} path={post.title.replace(/ /g, "-")} element={<Post post={post} />} />
                                    ))
                                }
                            </Route> 
                        ))
                    }
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<DashboardLayout />} >
                        <Route index element={<UserProfile />} />
                        <Route path="profile" element={
                            <RoleBasedRoute role={["user", "author", "admin"]} >
                                <UserProfile />
                            </RoleBasedRoute>} 
                        />
                        <Route path="favorites" element={
                            <RoleBasedRoute role={["user", "author", "admin"]} >
                                <FavoritePosts />
                            </RoleBasedRoute>} 
                        />
                        <Route path="comments" element={
                            <RoleBasedRoute role={["user", "author", "admin"]} >
                                <UserComments />
                            </RoleBasedRoute>} 
                        />
                    </Route>
                </Route>
            </Routes>

            <Footer />
        </div>

    )
}

export default App;
