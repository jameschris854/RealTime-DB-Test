
import firebase from 'firebase/compat';
import { ref, set,get,update,remove} from "firebase/database";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL:process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId:process.env.REACT_APP_appId
  };
let game = 'on'
let winList = []

  export const fireBaseInit = function () {
     firebase.initializeApp(firebaseConfig)
  } 
  
  
  export const updateGameBoard = async(db,query,player,pos) => {
    let currentBoard = await get(ref(db,query))
    let board =  currentBoard.val().data
    let sym = player === 1 ? 'x' : 'o'
    let updatedData = []

    board.map((e,key) => key === pos ? updatedData.push(sym): updatedData.push(e))
    
    if(game === 'on' ){
      update(ref(db,query),{
        data:updatedData
      })
      update(ref(db,query+'/player1'),{
        isActive : player === 1? false: true
      })
      update(ref(db,query+'/player2'),{
        isActive : player === 2? false: true
      })
    }
    checkGameRule(updatedData,db,query)
  }

  const checkGameRule = (data,db,query) => {
    game = 'draw'
    winList = []
    console.log(data);
    data.map(data => data === ''? game = 'on' : null )
    console.log(data[0],data[1],data[2])
    //check rows
    if((data[0] === data[1] && data[1] === data[2]) && data[1] !=='') winList =  [0,1,2]
    if((data[3] === data[4] && data[4] === data[5]) && data[4] !=='') winList =  [3,4,5]
    if((data[6] === data[7] && data[7] === data[8]) && data[7] !=='') winList =  [6,7,8]
    //check column
    if((data[0] === data[3] && data[3] === data[6]) && data[3] !=='') winList =  [0,3,6]
    if((data[1] === data[4] && data[4] === data[7]) && data[4] !=='') winList =  [1,4,7]
    if((data[2] === data[5] && data[5] === data[8]) && data[5] !=='') winList =  [2,5,8]
    //check cross
    if((data[0] === data[4] && data[4] === data[8]) && data[4] !=='') winList =  [0,4,8]
    if((data[3] === data[4] && data[4] === data[6]) && data[4] !=='') winList =  [3,4,6]

    console.log(winList);
    if(game === 'draw'){
      console.log('asdasdasd');
      update(ref(db,query),{
        gameStatus:"draw"
      })
    }else if(winList.length >0 ){
      update(ref(db,query),{
        gameStatus:"over",
        winList:winList
      })
    }
  }

  export const newGameInit = async(db,query,id,ip,name) => {
    console.log(name);
    if(!name) name = 'player2'
    set(ref(db,query+'/'+id),{
       id:id,
       player1:{
         ip:ip,
         name:name,
         isActive:true
       },
       player2:{
         ip:'',
         name:'waiting for player 2',
         isActive:false
       },
       gameStatus:'on',
       winList:[''],
       data:{
         0:'',
         1:'',
         2:'',
         3:'',
         4:'',
         5:'',
         6:'',
         7:'',
         8:'',
       }
    })
  }  
  export const resetGame = async(db,query,id,ip) => {
    update(ref(db,query+'/'+id),{
       gameStatus:'on',
       winList:[''],
       data:{
         0:'',
         1:'',
         2:'',
         3:'',
         4:'',
         5:'',
         6:'',
         7:'',
         8:'',
       }
    })
  }  

  export const joinGame = async(db,query,id,ip,name) => {
    console.log(ip);
    update(ref(db,query+'/'+id),{
      player2:{
        ip:ip,
        name:name
      }
    })
  }

  export const removeGame = async(db,query,id) => {
    console.log(db,query,id);
   let removeRef = await remove(ref(db,query+'/'+id))
   console.log(removeRef);
  }

export default firebase;