import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Home from './app/screens/Home'
import Signup from './app/screens/Signup'
import Login from './app/screens/Login'
import Articles from './app/screens/Articles'
import Exercises from './app/screens/Exercises'
import Supplements from './app/screens/Supplements'
import Tools from './app/screens/Tools'
import AboutUs from './app/screens/AboutUs'

import AdminDashboard from "./admin/Screens/Dashboard";
import AdminSupplement from "./admin/Screens/Supplement";
import AdminExercises from "./admin/Screens/Exercise";
import AdminArticle from "./admin/Screens/Article";
import AdminContact from './admin/Screens/Contact';
import AdminSettings from './admin/Screens/Settings';
import AdminProfile from './admin/Screens/Profile';

import UserDashboard from './user/Screens/Dashboard';
import Settings from "./user/Screens/Settings"
import Profile from "./user/Screens/Profile"

function App() { 

    return (
        <Router>
            <Routes>

                {/* AppRoutes  */}
                <Route exact path="/" element={<Home />} />
                <Route path="SignUp" element={<Signup />} />
                <Route path="LogIn" element={<Login />} />
                <Route path="Supplements" element={<Supplements />} />
                <Route path="Exercises" element={<Exercises />} />
                <Route path="Articles" element={<Articles />} />
                <Route path="Tools" element={<Tools />} />
                <Route path="About" element={<AboutUs />} />
                {/* AdminRoutes  */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/supplement" element={<AdminSupplement />} />
                <Route path="/admin/exercise" element={<AdminExercises />} />
                <Route path="/admin/article" element={<AdminArticle />} />
                <Route path="/admin/contact" element={<AdminContact />} />
                <Route path="/admin/setting" element={<AdminSettings />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                {/* UserRoutes  */}
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/setting" element={<Settings />} />

            </Routes>
        </Router>
    );
}

export default App;