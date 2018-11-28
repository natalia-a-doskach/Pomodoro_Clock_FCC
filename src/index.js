import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const workStyle= "#6C63FF";
const breakStyle= "#2BC8FF";
var a=100;

Number.prototype.zerofy = function() {
    let s = String(this);
    while (s.length <  2) {s = "0" + s;}
    return s;
}

class App extends React.Component{
constructor(props){
super(props);
this.state={
isWorkMode: true,
workDuration: 25,
breakDuration: 5,
currTime: 25*60,
isTimeRunning:false};
this.reset = this.reset.bind(this);
this.changeDuration = this.changeDuration.bind(this);
this.startTimer = this.startTimer.bind(this);
this.stopTimer = this.stopTimer.bind(this)
}
startTimer(){
this.setState({isTimeRunning:!this.state.isTimeRunning});
let now = Date.now();
let leftTime = this.state.currTime;
this.timer = setInterval(() => {this.setState({
  currTime: leftTime - Math.round((Date.now() - now) / 1000)
});
if (this.state.currTime <0){
this.setState({isWorkMode:!this.state.isWorkMode, isTimeRunning:false});
clearInterval(this.timer);
let audio = document.getElementById("aud");
audio.currentTime = 0;
audio.play();
if (this.state.isWorkMode){this.setState({currTime:this.state.workDuration*60})}
else {this.setState({currTime:this.state.breakDuration*60})}
}}, 1)
}

stopTimer(){
this.setState({isTimeRunning:!this.state.isTimeRunning});
clearInterval(this.timer);
}

reset(){
this.setState({isWorkMode: true,
  workDuration: 25,
  breakDuration: 5,
  currTime: 25*60,
isTimeRunning:false});
clearInterval(this.timer);
}
changeDuration(action){
if (!this.state.isTimeRunning){
  switch(action){
  case "incrWork": if (this.state.workDuration<60)
  {this.setState({workDuration: this.state.workDuration + 1})
  if (this.state.isWorkMode){
  this.setState({currTime: this.state.currTime + 1*60})
  }};
  break;

  case "decrWork": if (this.state.workDuration>1)
  {this.setState({workDuration: this.state.workDuration - 1,
  currTime: this.state.currTime - 1*60});
  if (this.state.isWorkMode){
  this.setState({currTime: this.state.currTime - 1*60})
  }};
  break;

  case "incrBreak": if (this.state.breakDuration<60)
  {this.setState({breakDuration: this.state.breakDuration + 1});
  if (!this.state.isWorkMode){
  this.setState({currTime: this.state.currTime + 1*60})
  }};
  break;
  case "decrBreak": if (this.state.breakDuration>1)
  {this.setState({breakDuration: this.state.breakDuration - 1});
  if (!this.state.isWorkMode){
  this.setState({currTime: this.state.currTime - 1*60})
  }}
  }};
}
render(){
let styleObj;
if (this.state.isWorkMode){styleObj = {background: workStyle}}
else{styleObj = {background: breakStyle}}
return(
<div id="outermost" style={styleObj} >
<main>
<TimeRegulator  workDuration={this.state.workDuration}
 breakDuration={this.state.breakDuration} changeDuration={this.changeDuration}/>
<Pomodoro isWorkMode={this.state.isWorkMode} workDuration={this.state.workDuration}
 breakDuration={this.state.breakDuration} currTime={this.state.currTime}
 isTimeRunning={this.state.isTimeRunning}
  startTimer={this.startTimer} stopTimer={this.stopTimer}/>
<Instructions isTimeRunning={this.state.isTimeRunning}/>
<ResetBtn reset={this.reset} isWorkMode={this.state.isWorkMode}/>
<audio src="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" type="audio/mpeg" id="aud"></audio>
</main>
<footer>
  <p>Made by <a target='_blank' rel="noopener noreferrer" href='https://github.com/natalia-a-doskach'>Natalia Doskach</a>.</p>
</footer>
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
  <p className="time" id="sessionTime">{this.props.workDuration.zerofy()}</p>
  <button className="increaseBtn arrowBtn" id="incrSession" value="incrWork"  onClick={this.handleClick}></button>
  <p className="lengthLbl">Session length</p>
  <br/>
  <button className="decreaseBtn" id="decrBreak" value="decrBreak"  onClick={this.handleClick}></button>
  <p className="time" id="breakTime">{this.props.breakDuration.zerofy()}</p>
  <button className="increaseBtn" id="incrBreak" value="incrBreak"  onClick={this.handleClick}></button>
  <p className="lengthLbl">Break length</p>
  </div>)}
}

class Pomodoro extends React.Component{
  constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this)
  }
handleClick(){
if (this.props.isTimeRunning){
this.props.stopTimer()
}
else{this.props.startTimer() }
}
render(){
if (this.props.isWorkMode){return(
  <button id="powCircle" onClick={this.handleClick}>
  <h1 style={{color: workStyle}} >WORK</h1>
  <img src="./workPic.svg" alt="man working"/>
  <h2 style={{color: workStyle}} >{parseInt(this.props.currTime/60).zerofy()+":"+(this.props.currTime%60).zerofy()}</h2>
  </button>
)}
else{return(
  <button id="powCircle" onClick={this.handleClick}>
  <h1>BREAK</h1>
  <img src="./breakPic.svg" alt="man playing"/>
  <h2>{parseInt(this.props.currTime/60).zerofy()+":"+(this.props.currTime%60).zerofy()}</h2>
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
render(){return <button id="restartBtn" onClick={this.handleClick}></button>}
}

class Instructions extends React.Component{
render(){
if (this.props.isTimeRunning){
return <p id="instructions">click inside the big <br/> circle to PAUSE</p>
} else{
return <p id="instructions">click inside the big <br/> circle to START</p>
}
}
}



ReactDOM.render(<App / > , document.getElementById('root'));
