import React from 'react';
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
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AutonDraw from '../Features/AutonDraw/AutonDraw';
import Splash from '../AppComposition/Splash';

class Dashboard extends React.Component {

    constructor(props) {
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
            marginLeft: '75px',
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
    
              <List>
                <ListItem><Link to="/auton">Auto Draw</Link></ListItem>
                
              </List>
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
              </AppBar>
              <Router>
                <div>

                <Switch>
                  <Route exact path="/" component={Splash}/>
                  <Route path="/auton" component={AutonDraw}/>
                </Switch>
                {drawer}
                </div>  
                </Router>
            </div>
          );
    }
}

export default Dashboard;