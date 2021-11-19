import { useEffect, useState } from "react";
import "./Pong.style.scss";

import { getDatabase } from "@firebase/database";
import firebase,{ fireBaseInit } from "../../firebase/firebase";
import { gameInit, joinGame, updateGame } from "../../firebase/test";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { useParams } from "react-router";
import React, { useRef } from 'react'

const Pong = () => {
  fireBaseInit();
  const db = getDatabase();
  const [player1_coordinates] = useObjectVal(firebase.database().ref("test/" + 'abcd' + "/player1_pos"));
  const [player2_coordinates] = useObjectVal(firebase.database().ref("test/" + 'abcd' + "/player2_pos"));
  const [localPos,setLocalPos] = useState({x:100,y:100})
  const [player,setPlayer] = useState(0)
  const [ballPos,setBallPos] = useState({x:50,y:10})
  let { param } = useParams();
  const [ballDir,setBallDir] = useState('downRight')
  const [ballSpeed,setBallSpeed] = useState(7)
  const [padle1,setPadle1] = useState({x:0,y:0,h:50,w:5})
  const [padle2,setPadle2] = useState({x:595,y:0,h:300,w:5})
  const [isDown,setDown] = useState(false)
  const [render,setRender] = useState(1)
  const [fps,setFps] = useState(10)

  useEffect(() => {
    console.log('component mounted');
    gameInit(db,'test','abcd')
    if(param){
      console.log(param);
      setPlayer(param)
    }
  document.addEventListener('keypress', logKey);
  },[])

  function logKey (){
    
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setDown(true)
}

function handleMouseUp(e) {
  e.preventDefault();
  setDown(false)
}

function handleMouseOut(e) {
    e.preventDefault();
}

function handleMouseMove(e) {
    if(isDown){
      if(e.nativeEvent.offsetY < document.getElementById('pong-canvas').height-padle1.h){
        setPadle1({x:0,y:e.nativeEvent.offsetY,h:padle1.h,w:padle1.w})
      }
    }
    e.preventDefault();

}

const canvasRef1 = useRef(null)
const canvasRef2 = useRef(null)
const canvasRef3 = useRef(null)


const changeBallDirection = (boundary) => {
  if(boundary === 'top'){
    if(ballDir === 'upRight'){
      setBallDir('downRight')
    }else if(ballDir === 'upLeft'){
      setBallDir('downLeft')
    }
  }else if(boundary === 'bottom'){
    console.log('bottom2');
    if(ballDir === 'downRight'){
      console.log('setdown right');
      setBallDir('upRight')
    }else if(ballDir === 'downLeft'){
      console.log('setup left');
      setBallDir('upLeft')
    }
  }else if(boundary === 'left'){
    if(ballDir === 'upLeft'){
      setBallDir('upRight')
    }else if(ballDir === 'downLeft'){
      setBallDir('downRight')
    }
  }else if(boundary === 'right'){
    if(ballDir === 'downRight'){
      setBallDir('downLeft')
    }else if(ballDir === 'upRight'){
      setBallDir('upLeft')
    }
  }
  updateBallPosition()

}


const updateBallPosition = (factor=0) => {
  console.log(ballPos.y/10);
  if(ballPos.y/10 <2 ){
    console.log(true,-1);
    factor = 1
  }else if(ballPos.y/5 === 0){
    console.log(true,2);
    factor = 2
  }
  if(ballDir === 'upLeft'){
    ballPos.x = ballPos.x - ballSpeed + factor
    ballPos.y = ballPos.y - ballSpeed + factor
    setBallPos({x:ballPos.x,y:ballPos.y})
  }else if(ballDir === 'upRight'){
    ballPos.x = ballPos.x + ballSpeed + factor
    ballPos.y = ballPos.y - ballSpeed + factor
    setBallPos({x: ballPos.x,y:ballPos.y})
  }else if(ballDir === 'downLeft'){
    ballPos.x = ballPos.x - ballSpeed + factor
    ballPos.y = ballPos.y + ballSpeed + factor
    setBallPos({x: ballPos.x,y:ballPos.y})
  }else if(ballDir === 'downRight'){
    ballPos.x = ballPos.x + ballSpeed + factor
    ballPos.y = ballPos.y + ballSpeed + factor
    setBallPos({x:ballPos.x,y:ballPos.y})
  }
}

function drawBall(canvasRef) {
  // drawing code
  const canvas = canvasRef.current

  const board = canvas.getContext('2d')
  board.clearRect(0, 0, canvas.width, canvas.height);

  //Our first draw
  board.fillStyle = 'rgba(0,0,0,0.001)'
  board.fillRect(0, 0, board.canvas.width, board.canvas.height)

  // rec 1
  const ball = canvas.getContext('2d')
  ball.beginPath();
  ball.arc(ballPos.x, ballPos.y, 10, 0, Math.PI*2);
  ball.fillStyle = "#0095DD";
  ball.fill();
  ball.closePath();
  
    const ballWidth = 10

    // if(ballPos.x <= document.getElementById('pong-canvas').width-10){
    const paddleBoundaryCheck = (data) => {
      let x = padle1.x 
      let y = padle1.y
      let w = padle1.w
      let h = padle1.h

      if(data === 2){
         x = padle2.x 
         y = padle2.y
         w = padle2.w
         h = padle2.h
      }
      
      var circle={x:ballPos.x,y:ballPos.y,r:20};
      var rect={x,y,w,h};
        // return true if the rectangle and circle are colliding
        var distX = Math.abs(circle.x - rect.x-rect.w/2);
        var distY = Math.abs(circle.y - rect.y-rect.h/2);
        if (distX > (rect.w/2 + circle.r)) {
          console.log(1);
          return false; }
        if (distY > (2+rect.h/2 + circle.r)) { 
          console.log(2);
          return false; }

        if (distX <= (2+rect.w/2)) {
          console.log(3);
          return true; } 
        if (distY <= (2+rect.h/2)) { 
          console.log(4);
          return true; }
        var dx=distX-rect.w/2;
        var dy=distY-rect.h/2;
        console.log(dx*dx+dy*dy<=(circle.r*circle.r))
        return (dx*dx+dy*dy<=(circle.r*circle.r));
    }
    //check collision top
    if( ballPos.y <= ballWidth ){
      changeBallDirection('top')
    //check collision Bottom
    }else if( ballPos.y >= document.getElementById('pong-canvas').height-10){
        changeBallDirection('bottom',1)
    }else if( ballPos.x <= ballWidth ){
      // changeBallDirection('left')
      updateBallPosition()
    }else if( ballPos.x >= 590 ){
      // changeBallDirection('left')
      updateBallPosition()
    }else if( ballPos.x >= document.getElementById('pong-canvas').width-10){
      // changeBallDirection('right')
    }else if(paddleBoundaryCheck(1)){
      console.log('left boundary');
        changeBallDirection('left')
    }else if(paddleBoundaryCheck(2)){
      console.log('right boundary');
      changeBallDirection('right')
    }else{
      updateBallPosition()
    }
  // }

}

const drawPadle1 = (canvasRef) => {
  const canvas = canvasRef.current

  const board = canvas.getContext('2d')
  board.clearRect(0, 0, canvas.width, canvas.height);
  //Our first draw
  board.fillStyle = 'white'
  board.fillRect(0, 0, board.canvas.width, board.canvas.height)

  const paddle1 = canvas.getContext('2d')
  //Our first draw

  paddle1.fillStyle = 'red'
  paddle1.fillRect(padle1.x, padle1.y, padle1.w, padle1.h)
}

const drawPadle2 = (canvasRef) => {
  const canvas = canvasRef.current

  const board = canvas.getContext('2d')
  //Our first draw
  board.fillStyle = 'rgba(0,0,0,0.001)'
  board.fillRect(0, 0, board.canvas.width, board.canvas.height)

  const paddle2 = canvas.getContext('2d')
  //Our first draw
  paddle2.clearRect(0, 0, canvas.width, canvas.height);

  paddle2.fillStyle = 'red'
  paddle2.fillRect(padle2.x, padle2.y, padle2.w, padle2.h)
}

const renderFn = () => {
setRender(render+1)
}

useEffect(() => {
  
 const drawInt1 = setInterval(drawBall(canvasRef1), 10);
 const drawInt2 = setInterval(drawPadle1(canvasRef2), 10);
 const drawInt3 = setInterval(drawPadle2(canvasRef3), 10);

 const render = setInterval(renderFn, fps);

 return(() => {
   clearInterval(drawInt1)
   clearInterval(drawInt2)
   clearInterval(drawInt3)
   clearInterval(render)
 })
}, [render])

 return (<>
          <button onClick={() => setBallPos({x:250,y:150})} >RESET</button>
          <button onClick={() => setFps(fps <= 10 ? 1000 : 10 )} >pause</button>
          <div className="pong-container">
          <canvas 
          width="600" 
          height="300" 
          id='padle-canvas' 
          className="canvas" 
          ref={canvasRef2} />
           <canvas 
          width="600" 
          height="300" 
          id='padle-canvas' 
          className="canvas" 
          ref={canvasRef3} />
          <canvas 
          onMouseDown={(e) => handleMouseDown(e)} 
          onMouseMove={(e) => handleMouseMove(e)} 
          onMouseUp={(e) => handleMouseUp(e)}  
          width="600" 
          height="300" 
          id='pong-canvas' 
          className="canvas"
          ref={canvasRef1} />
        </div></>)
};

export default Pong;
