import React from "react";

import Sidebar from './Sidebar';

function SidebarExample() {
  return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className='sidediv'
          style={{
            padding: "10px",
            width: "275px",
            height: "100vh",
            background: "#373a47"
          }}
        >
        hello sidediv
        </div>

        <div className='messagesDisplay'>
          <div className='messages'>
            messages
            words
          </div>
          <div className='messageInput'>
            input field
          </div>

        </div>
      </div>
  );
}

export default SidebarExample;