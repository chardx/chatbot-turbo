import React from "react";
import { useSelector } from "react-redux";
const UserDisplay = () => {
  const userDisplayName = useSelector((state) => state.auth.userDisplayName);
  const userPhotoUrl = useSelector((state) => state.auth.userPhotoUrl);
  return (
    <>
      <div className="fading-hr m-2"></div>

      <div className="flex flex-row space-x-12 ml-2">
        <div>
          <img className="w-7 h-7 rounded-full" src={userPhotoUrl} />
        </div>
        <div className="text-center">{userDisplayName}</div>
      </div>
    </>
  );
};

export default UserDisplay;
