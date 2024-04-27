import React from "react";

import HomeButton from "../HomeButton/HomeButton";

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>

      {/* Can remove HomeButton, only purpose is to test redirect functionality */}
      <HomeButton />
    </div>
  );
}

export default Dashboard;
