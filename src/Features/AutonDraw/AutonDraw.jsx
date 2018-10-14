import React from 'react';
import TurningPointField from '../../VRCTurningPointField.png';
class AutonDraw extends React.Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.image = React.createRef();
    }

    fix_dpi() {
        let dpi = window.devicePixelRatio;
        const canvas = this.canvas.current;
        //get CSS height
        //the + prefix casts it to an integer
        //the slice method gets rid of "px"
        let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
        //get CSS width
        let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
        //scale the canvas
        canvas.setAttribute('height', style_height * dpi);
        canvas.setAttribute('width', style_width * dpi);
    }
    componentDidMount() {
        this.fix_dpi();
        const canvas = this.canvas.current;
        const ctx = canvas.getContext("2d");
        const fieldImage = new Image();
        fieldImage.src = TurningPointField;
        fieldImage.onload = () => {
            ctx.drawImage(fieldImage, 0, 0, canvas.width, canvas.height);
        }

    }
    render() {
        return (
        <div id="fieldDiv">
            <canvas id="fieldCanvas" ref={this.canvas}></canvas>
            <img id="fieldImage" src={TurningPointField} alt="tpfield" style={{display: "none"}} ref={this.image}/>
        </div>);
    }
}

export default AutonDraw;