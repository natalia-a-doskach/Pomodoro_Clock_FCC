import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
constructor(props){
super(props);
this.state={
isWorkMode: true,
workDuration: 25,
breakDuration: 5,
currTimeWork: 25*60,
currTimeBreak: 5*60,
isTimeRunning:false};
this.reset = this.reset.bind(this);
this.changeDuration = this.changeDuration.bind(this);
}
reset(){
this.setState({isWorkMode: true,
  workDuration: 25,
  breakDuration: 5,
  currTimeWork: 25*60,
  currTimeBreak: 5*60,
isTimeRunning:false})
}
changeDuration(action){
if (!this.state.isTimeRunning){
  switch(action){
  case "incrWork": if (this.state.workDuration<60)
  {this.setState({workDuration: this.state.workDuration + 1,
  currTimeWork: this.state.currTimeWork + 1*60})};
  break;
  case "decrWork": if (this.state.workDuration>1)
  {this.setState({workDuration: this.state.workDuration - 1,
  currTimeWork: this.state.currTimeWork - 1*60})};
  break;
  case "incrBreak": if (this.state.breakDuration<60)
  {this.setState({breakDuration: this.state.breakDuration + 1,
  currTimeBreak: this.state.currTimeBreak + 1*60})};
  break;
  case "decrBreak": if (this.state.breakDuration>1)
  {this.setState({breakDuration: this.state.breakDuration - 1,
  currTimeBreak: this.state.currTimeBreak - 1*60})}
  }};
}
render(){return(
<div>
<TimeRegulator  workDuration={this.state.workDuration}
 breakDuration={this.state.breakDuration} changeDuration={this.changeDuration}/>
<Pomodoro isWorkMode={this.state.isWorkMode} workDuration={this.state.workDuration}
 breakDuration={this.state.breakDuration} currTimeWork={this.state.currTimeWork}
 currTimeBreak={this.state.currTimeBreak}/>
<p id="instructions">press inside the big <br/> circle to start/pause <br/> session...</p>
<ResetBtn reset={this.reset}/>
</div>
)}
}
class TimeRegulator extends React.Component{
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this)
  }
handleClick(e){
let action = e.target.value;
this.props.changeDuration(action)
}
render(){return(
  <div id="lengthsDiv">
  <button className="decreaseBtn arrowBtn" id="decrSession" value="decrWork" onClick={this.handleClick}></button>
  <p className="time" id="sessionTime">{this.props.workDuration}</p>
  <button className="increaseBtn arrowBtn" id="incrSession" value="incrWork"  onClick={this.handleClick}></button>
  <p className="lengthLbl">Session length</p>
  <br/>
  <button className="decreaseBtn" id="decrBreak" value="decrBreak"  onClick={this.handleClick}></button>
  <p className="time" id="breakTime">{this.props.breakDuration}</p>
  <button className="increaseBtn" id="incrBreak" value="incrBreak"  onClick={this.handleClick}></button>
  <p className="lengthLbl">Break length</p>
  </div>)}
}

class Pomodoro extends React.Component{
render(){
if (this.props.isWorkMode){return(
  <button id="powCircle">
  <h1>WORK</h1>
  <img src="./workPic.svg" alt="man working"/>
  <h2>{parseInt(this.props.currTimeWork/60)+":"+this.props.currTimeWork%60}</h2>
  </button>
)}
else{return(
  <button id="powCircle">
  <h1>BREAK</h1>
  <img src="./breakPic.svg" alt="man playing"/>
  <h2>{parseInt(this.props.currTimeBreak/60)+":"+this.props.currTimeBreak%60}</h2>
  </button>
)}
}
}

class ResetBtn extends React.Component{
constructor(props){
super(props);
this.handleClick = this.handleClick.bind(this)
}
handleClick(){this.props.reset()}
render(){return(<button id="restartBtn" onClick={this.handleClick}></button>)}
}

ReactDOM.render(<App / > , document.getElementById('root'));
