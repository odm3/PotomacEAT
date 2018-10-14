import React from 'react';
import TurningPointField from '../../VRCTurningPointField.png';
import { Stage, Layer, Image } from 'react-konva';

class TurningPointFieldImage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                image: null,
                isDrawing: false,
                mode: "brush",
            };
            this.handleMouseDown = this.handleMouseDown.bind(this);
            this.handleMouseUp = this.handleMouseUp.bind(this);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.turningPoint = React.createRef();
        }

        componentDidMount() {
            const canvas = document.getElementsByTagName("canvas")[0];
            const context = canvas.getContext("2d");
            this.setState({canvas, context});
            console.log(canvas);
            const image = new window.Image();
            image.src = TurningPointField;
            image.onload = () => {
                console.log(image.width);
                console.log(image.height);
              // setState will redraw layer
              // because "image" property is changed
              this.setState({
                image,
              });
            };
          }
          handleMouseDown() {
            console.log("mousedown");
            this.setState({ isDrawing: !this.state.isDrawing});
            const stage = this.turningPoint.current.parent.parent;
            this.lastPointerPosition = stage.getPointerPosition();
          }
          handleMouseUp = () => {
            console.log("mouseup");
            this.setState({ isDrawing: false });
          };

          handleMouseMove = () => {
            // console.log('mousemove');
            const { context, isDrawing, mode } = this.state;
        
            if (isDrawing) {
              console.log("drawing");
        
              // TODO: Don't always get a new context
              context.strokeStyle = "red";
              context.lineJoin = "round";
              context.lineWidth = 5;
        
              if (mode === "brush") {
                context.globalCompositeOperation = "source-over";
              } else if (mode === "eraser") {
                context.globalCompositeOperation = "destination-out";
              }
              context.beginPath();
              console.log(this.turningPoint);
              var localPos = {
                x: this.lastPointerPosition.x - this.turningPoint.current.x(),
                y: this.lastPointerPosition.y - this.turningPoint.current.y()
              };
              console.log("moveTo", localPos);
              context.moveTo(localPos.x, localPos.y);
        
              // TODO: improve
              const stage = this.turningPoint.current.parent.parent;
        
              var pos = stage.getPointerPosition();
              localPos = {
                x: pos.x - this.turningPoint.current.x(),
                y: pos.y - this.turningPoint.current.y()
              };
              console.log("lineTo", localPos);
              context.lineTo(localPos.x, localPos.y);
              context.closePath();
              context.stroke();
              this.lastPointerPosition = pos;
              this.turningPoint.current.getLayer().draw();
            }
          };

          render() {
            return (
                <Image image={this.state.image}
                    ref={this.turningPoint}
                    scaleX={0.9}
                    scaleY={0.75}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                />
            );
          }
}


class AutonDraw extends React.Component {

    constructor(props) {
        super(props);
        this.stage = React.createRef();
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
        const tpimg = this.image.current;
        console.log(tpimg);
    }
    getLocation(event) {
        console.log(event.screenX, event.screenY);
    }
    render() {
        return (
            <div id="fieldCanvas">
            <Stage width={window.outerWidth} height={window.outerHeight} ref={this.stage}>
                <Layer>
                    <TurningPointFieldImage ref={this.image}/>
                </Layer>
            </Stage>
            </div>

        );
    }
}

export default AutonDraw;