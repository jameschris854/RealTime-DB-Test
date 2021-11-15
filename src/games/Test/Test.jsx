import { useEffect, useState } from "react";
import "./Test.style.scss";

import { getDatabase } from "@firebase/database";
import firebase,{ fireBaseInit } from "../../firebase/firebase";
import { gameInit, joinGame, updateGame } from "../../firebase/test";
import { useObject, useObjectVal } from "react-firebase-hooks/database";
import { useParams } from "react-router";
const Test = () => {
  fireBaseInit();
  const db = getDatabase();
  const [player1_coordinates] = useObjectVal(firebase.database().ref("test/" + 'abcd' + "/player1_pos"));
  const [player2_coordinates] = useObjectVal(firebase.database().ref("test/" + 'abcd' + "/player2_pos"));
  const [localPos,setLocalPos] = useState({x:100,y:100})
  const [player,setPlayer] = useState(0)
  let { param } = useParams();

  useEffect(() => {
    console.log('component mounted');
    gameInit(db,'test','abcd')
    if(param){
      console.log(param);
      setPlayer(param)
    }
    document.addEventListener('keypress', logKey);
  },[])

  useEffect(() => {
    let m = document.querySelector(`.draggable-div${player}`)
    console.log(m);
    if(m){
      m.addEventListener('mousedown', mouseDown, false);
      window.addEventListener('mouseup', mouseUp, false);
    }
    return(() => {
      document.removeEventListener('keypress',logKey)
    })
  },[player])

  function logKey(e) {
    if(e.code === 'KeyW'){
      let elmnt = document.querySelector(`.draggable-div${player}`)
      console.log(`${e.code}`,elmnt.style.top,elmnt.style.top.split('px')[0]);
      let pos4= `${((elmnt.style.top.split('px')[0]*1)) + 1}px`
      elmnt.style.top = pos4
      joinGame(db,'test','abcd',{pos1:1,pos2:0,pos3:500,pos4:elmnt.style.top.split('px')[0]*1})
    }
  }

  useEffect(() => {
    console.log(player1_coordinates,player2_coordinates,player);
    if( player === '1' ){
        var pos =  player2_coordinates
        console.log(pos);
        let m = document.querySelector(`.draggable-div2`)
        console.log(pos);
        m.style.left = pos?.x + 'px';
        m.style.top = pos?.y + 'px';
        console.log(m.style.top);
      }
  },[player2_coordinates])
  useEffect(() => {
    console.log(player1_coordinates,player2_coordinates);
    if(player === '2'){
        var pos = player1_coordinates
        let m = document.querySelector(`.draggable-div1`)
        console.log(pos);
        m.style.left = pos?.x + 'px';
        m.style.top = pos?.y + 'px';
        console.log(m.style.top);
      }
  },[player1_coordinates])
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

 return (<div>
          <div className='draggable-div1' draggable={true} style={{top:'0px',left:'0px'}}>1</div>
          <div className='draggable-div2' draggable={true} style={{top:'0px',left:'0px'}}>2</div>
        </div>)
};

export default Test;
