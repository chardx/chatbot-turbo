import React from "react";

const AI_Roles = ({ AIName, description, content }) => {
  return (
    <li>
      <p>{AIName}</p>
      <span>{description}</span>
    </li>
  );
};

export default AI_Roles;
