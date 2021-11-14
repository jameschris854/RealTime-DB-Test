import { useEffect, useState } from "react";
import "./Test.style.scss";

import { getDatabase } from "@firebase/database";
import firebase,{ fireBaseInit } from "../../firebase/firebase";
import { joinGame } from "../../firebase/test";
import { useObject, useObjectVal } from "react-firebase-hooks/database";

const Test = () => {
  fireBaseInit();
  const db = getDatabase();
  const [coordinates] = useObjectVal(firebase.database().ref("test/" + 'abcd' + "/data"));
  const [localPos,setLocalPos] = useState({pos1:0,pos2:0,pos3:0,pos4:0})

  useEffect(() => {
    console.log('component mounted');
    setLocalPos({ pos1: 0, pos2: 0, pos3: 0, pos4: 0 })
    let m = document.querySelector('.draggable-div')
    document.addEventListener('keypress', logKey);
    m.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    joinGame(db,'test','abcd',{pos1:0,pos2:0,pos3:0,pos4:0})
    return(() => {
      document.removeEventListener('keypress',logKey)
    })
  },[])

  function logKey(e) {
    if(e.code === 'KeyW'){
      let elmnt = document.querySelector('.draggable-div')
      console.log(`${e.code}`,elmnt.style.top,elmnt.style.top.split('px')[0]);
      let pos4= `${((elmnt.style.top.split('px')[0]*1)) + 1}px`
      elmnt.style.top = pos4
      joinGame(db,'test','abcd',{pos1:1,pos2:0,pos3:500,pos4:elmnt.style.top.split('px')[0]*1})
    }
  }

  useEffect(() => {
    console.log(coordinates);
    setLocalPos(coordinates)
    if(coordinates){
      let m = document.querySelector('.draggable-div')
      m.style.top = coordinates.pos2 + 'px';
      m.style.left = coordinates.pos1 + 'px';
    }
  },[coordinates])

  function mouseUp() {
    window.removeEventListener('mousemove', move, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', move, true);
}

function move(e) {
  joinGame(db,'test','abcd',{pos1:e.clientX,pos2:e.clientY,pos3:0,pos4:0})
  let m = document.querySelector('.draggable-div')
    m.style.top = e.clientY + 'px';
    m.style.left = e.clientX + 'px';
};


 return <div>
   <div className='draggable-div' draggable={true} style={{top:'0px',left:'0px'}}>1</div>
   {/* <div className='draggable-div 2'>2</div> */}
   </div>
};

export default Test;
