import React, {useState, useEffect} from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Home as HomeIcon, Info as InfoIcon, Mail as MailIcon, Menu as MenuIcon } from '@mui/icons-material';

import Home from './pages/Chatlog';
import About from './pages/About';
import Contact from './pages/Overview';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Chat Log', icon: <InfoIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Overview', icon: <HomeIcon />, path: '/overview' },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Router>
      <div>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} component={Link} to={item.path} >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div>
          <button onClick={toggleDrawer}>
            <MenuIcon />
          </button>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/overview" element={<Contact />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
