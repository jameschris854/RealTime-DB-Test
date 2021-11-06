import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./Title.styles.scss";

const Title = ({ children,style }) => {
  const [title, setTitle] = useState("");
  let [index, setIndex] = useState(0);
  let [blink,setBlink] = useState(true)
  useEffect(() => {
    let str = children.split("");
    if(str.length-1 < index-1){
        setIndex(0)
        setTitle('')
    }
      const textInterval = setInterval(() => {
        setTitle(title + str[index]);
        setIndex(index + 1);
      }, 1000);

    return () => {
        clearInterval(textInterval);
      };
  }, [index,children,title]);

  useEffect(() => {
    console.log(blink);
      const blinkinterval = setInterval(() => {
        blink === true ? setBlink(false) : setBlink(true)
    }, 300);

    return () => {
        console.log('clearing blink');
        clearInterval(blinkinterval);
      };
  }, [blink]);
  

  return <div className="Title-container" style={{...style}}>
      {title === ''? ' ': title}{blink === true ? '|' : ''}
      </div>
};

export default Title;
