import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import React from "react";

const Auth = (props) => {
  const [activetab, setactivetab] = React.useState(props.tabindex);

  const handleTabsChange = (index) => {
    setactivetab(index);
  };

  return (
    <Tabs isFitted variant="enclosed" index={activetab} style={{color:'grey'}} >
      <TabList mb="2em">
        <Tab style={{color:'grey'}} onClick={() => handleTabsChange(0)}>Login</Tab>
        <Tab style={{color:'grey'}} onClick={() => handleTabsChange(1)}>Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <Login handleTabsChange={handleTabsChange} />
        </TabPanel>
        <TabPanel>
          <Signup handleTabsChange={handleTabsChange} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Auth;
