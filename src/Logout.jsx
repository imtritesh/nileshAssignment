import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPhoto from "./assets/th.jpeg";
const Logout = () => {
  const [confirmBox, setConfirmBox] = useState(false);
  const navigate = useNavigate();
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  };
  return (
    <div
      onClick={() => {
        const isConfirmed = window.confirm("Do you really want to logout?");
        console.log(isConfirmed);
        if (isConfirmed === true) {
          setConfirmBox(false);
          navigate("/");
          return;
        }
        setConfirmBox(isConfirmed);
      }}
    >
      {!confirmBox && (
        <img src={LogoutPhoto} alt="Logout" className="logoutphoto" />
      )}
    </div>
  );
};

export default Logout;
