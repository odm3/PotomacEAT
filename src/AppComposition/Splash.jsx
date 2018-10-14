import React from 'react';
import TurningPoint from '../VRC Turning Point.svg';
import '../App.css';
class Splash extends React.Component {

    render() {
        return (
            <div className="App-header">
                <img src={TurningPoint} className="App-logo" alt="logo" />
            </div>
        );
    }
}

export default Splash;