import './profile.css';
import { useEffect, useState } from "react";
import userIcon from '../../components/heding/hedingimg/user.svg';

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
    <div className="profile-Main-container">
        <div className="profile-info">
            <h1>User Profile</h1>

            <img width="30" height="30" src={userIcon} alt="user"/>
            <span className="profile-name">{userEmail}</span>
        </div>
      
    
    </div>
  )
}
