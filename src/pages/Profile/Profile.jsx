import { useEffect, useState } from "react";
import userIcon from '../../components/Heading/heading-img/user.svg';
import { Outlet, NavLink } from "react-router-dom";

export default function profile() {
    const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUserEmail(user.email || "");
      }
    };

    loadUser();
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  return (
    <>
    <div className="profile-Main-container">
        <div className="profile-info">
            <h1>User Profile</h1>

            <img width="30" height="30" src={userIcon} alt="user"/>
            <span className="profile-name">{userEmail}</span>
        </div>
      
    
    </div>
     <div>
      <nav>
        <NavLink to="personal-info">Personal Info</NavLink> |{" "}
        <NavLink to="credits-history">Credits History</NavLink>
      </nav>
      <Outlet />
    </div>
    </>
  )
}
