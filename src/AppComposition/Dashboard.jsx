import React from 'react';
import TurningPoint from '../VRC Turning Point.svg';
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'typeface-roboto';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Dashboard extends React.Component {

    constructor(props) {
      console.log(props);
      super(props);
      this.state = {
        open: false
      };
    }
    handleDrawerOpen = () => {
      this.setState({ open: true});
    }

    handleDrawerClose = () => { 
      this.setState({ open: false});
    }
    render() {
        const appBarStyle = {
            marginLeft: '30px',
          };
          const chevronStyle = {
            float: 'right',
          };
          const { open } = this.state;
          const drawer = (
            <Drawer
              variant="persistent"
              anchor="left"
              open={open}
            >
            <div>
              <IconButton onClick={this.handleDrawerClose} style={chevronStyle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <Router>
              <List>
                <ListItem><Link to="/">Item 1</Link></ListItem>
                <ListItem><Link to="/">Item 2</Link></ListItem>
              </List>
              </Router>
            </Drawer>
          );
          return (
            <div className="App">
              <AppBar position="static" color="primary">
              <Toolbar>
                  <IconButton classnamne="menuButton" color="inherit" aria-label="menu" onClick={this.handleDrawerOpen}>
                    <MenuIcon/>
                  </IconButton>
                  <Typography variant="h6" color="inherit" style={appBarStyle}>
                  Potomac Event Analytic Tool
                  </Typography>
              </Toolbar>
              <header className="App-header">
              
                <img src={TurningPoint} className="App-logo" alt="logo" />
                
                  <Router>
                    <p>
                      <Link to="/">Autonomous Path></Link>
                    </p>
                  </Router>
                
              </header>
              </AppBar>
              {drawer}
            </div>
          );
    }
}

export default Dashboard;