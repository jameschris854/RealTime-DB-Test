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
  const [ballPos,setBallPos] = useState({x:10,y:50})
  let { param } = useParams();
  const [ballDir,setBallDir] = useState('downRight')
  const [ballSpeed,setBallSpeed] = useState(5)
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

  function mouseUp() {
    window.removeEventListener('mousemove', move, true);
  }

  function mouseDown(e) {
    window.addEventListener('mousemove', move, true);
  }

function move(e) {
  updateGame(db,'test','abcd',{player,coordinates:{pos1:e.clientX,pos2:e.clientY}})
  let m = document.querySelector(`.draggable-div${player}`)
    m.style.top = e.clientY + 'px';
    m.style.left = e.clientX + 'px';
};

const canvasRef = useRef(null)


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


const incX = (operator) => {
  console.log(ballPos.x,ballSpeed);
  if(operator === '+'){
    return ballPos.x+ballSpeed
  }else{
    return ballPos.x-ballSpeed
  }
}

const incY = (operator) => {
  if(operator === '+'){
    return ballPos.y + ballSpeed
  }else{
    return ballPos.y - ballSpeed
  }} 

const updateBallPosition = () => {
  if(ballDir === 'upLeft'){
    ballPos.x = ballPos.x - ballSpeed
    ballPos.y = ballPos.y - ballSpeed
    setBallPos({x:ballPos.x,y:ballPos.y})
  }else if(ballDir === 'upRight'){
    ballPos.x = ballPos.x + ballSpeed
    ballPos.y = ballPos.y - ballSpeed
    setBallPos({x: ballPos.x,y:ballPos.y})
  }else if(ballDir === 'downLeft'){
    ballPos.x = ballPos.x - ballSpeed
    ballPos.y = ballPos.y + ballSpeed
    setBallPos({x: ballPos.x,y:ballPos.y})
  }else if(ballDir === 'downRight'){
    ballPos.x = ballPos.x + ballSpeed
    ballPos.y = ballPos.y + ballSpeed
    setBallPos({x:ballPos.x,y:ballPos.y})
  }
  
  // if(ballDir === 'upLeft'){
  //   setBallPos({x:ballPos.x--,y:ballPos.y--})
  // }else if(ballDir === 'upRight'){
  //   setBallPos({x:ballPos.x++,y:ballPos.y--})
  // }else if(ballDir === 'downLeft'){
  //   setBallPos({x:ballPos.x--,y:ballPos.y++})
  // }else if(ballDir === 'downRight'){
  //   setBallPos({x:ballPos.x++,y:ballPos.y++})
  // }
}

function draw() {
  // drawing code
  const canvas = canvasRef.current
  const board = canvas.getContext('2d')
  //Our first draw
  board.fillStyle = 'white'
  board.fillRect(0, 0, board.canvas.width, board.canvas.height)
  // rec 1
  const ball = canvas.getContext('2d')
  ball.beginPath();
  ball.arc(ballPos.x, ballPos.y, 10, 0, Math.PI*2);
  ball.fillStyle = "#0095DD";
  ball.fill();
  ball.closePath();

  console.log( document.getElementById('pong-canvas').width,ballPos);
  if(ballPos.x <= document.getElementById('pong-canvas').width-10){
    
    console.log('col check', ballPos.y === document.getElementById('pong-canvas').height-10);
    //check collision top
    if( ballPos.y <= 10 ){
      changeBallDirection('top')
    //check collision top
    }else if( ballPos.y >= document.getElementById('pong-canvas').height-10){
      console.log('bottom');
      changeBallDirection('bottom')
    }else if( ballPos.x <= 10 ){
      changeBallDirection('left')
    }else if( ballPos.x >= document.getElementById('pong-canvas').width-10){
      console.log('right');
      changeBallDirection('right')
    }else{
      updateBallPosition()
      console.error('updatepos');
    }
  }

}

useEffect(() => {
  
},[ballDir])

useEffect(() => {
  console.log('canvas',ballDir);
  
 const drawInt = setInterval(draw, 10);

 return(() => {
   clearInterval(drawInt)
 })
}, [ballDir])

 return (<div>
          <canvas  width="600" height="300" id='pong-canvas' ref={canvasRef} />
        </div>)
};

export default Pong;
