import React from "react";

import Sidebar from './Sidebar';


// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

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