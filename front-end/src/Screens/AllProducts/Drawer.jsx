import React from "react";
import { Drawer, Button } from "antd";
function NestedDrawer({ childDrawer, closeChildDrawer, calledBy = "nested" }) {
  console.log(closeChildDrawer);
  return (
    <Drawer
      title="Filter & Sort"
      width={520}
      closable={false}
      onClose={closeChildDrawer}
      visible={childDrawer}
    >
      <h1>Hello I am {calledBy} drawer</h1>
    </Drawer>
  );
}

export default NestedDrawer;
