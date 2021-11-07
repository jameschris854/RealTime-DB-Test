import React, { useEffect,useState } from "react";
import "./Title.styles.scss";

const Title = ({children,style}) => {
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    animateText()
  }, []);

  const animateText = () => {
    let str = children.split("");
    let i = 0
    let text = ''
    
    setInterval(() => {
      if(str.length-1 < i){
        setIndex(0)
        setTitle('')
        text = ''
        i = 0
    }
      console.log(index,title);
      text = text+str[i]
      setTitle(text);
      i++
    }, 1000);

  }
  

  return <div className="Title-container" style={{...style}} >
      {title === ''? ' ': title}{ true ? '|' : ''}
      </div>
};

export default Title;
