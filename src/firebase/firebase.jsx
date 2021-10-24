
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

  const checkWinCondition = (a,b,c,dbData) => {
    console.log(dbData,'db');
      if(a === b && b === c && b !== '') {
        update(ref(dbData.db,dbData.query),{
          gameStatus:"over",
          winList:[a,b,c]
        })
      }
    }

  const checkGameRule = (data,db,query) => {
    game = 'draw'
    winList = []
    let dbData = {db:db,query:query}
    console.log(data);
    data.map(data => data === ''? game = 'on' : null )
    console.log(data[0],data[1],data[2])
    console.log(dbData,'eeeeeeeeeeeeeeeeeeeeeeee');
    //check rows
    winList = checkWinCondition(data[0],data[1],data[2],dbData)
    winList = checkWinCondition(data[3],data[4],data[5],dbData)
    winList = checkWinCondition(data[6],data[7],data[8],dbData)
    //check column
    winList = checkWinCondition(data[0],data[3],data[6],dbData)
    winList = checkWinCondition(data[1],data[3],data[7],dbData)
    winList = checkWinCondition(data[2],data[5],data[8],dbData)
    //check cross
    winList = checkWinCondition(data[0],data[4],data[8],dbData)
    winList = checkWinCondition(data[3],data[4],data[6],dbData)
    console.log(winList);
    if(game === 'draw'){
      console.log('asdasdasd');
      update(ref(db,query),{
        gameStatus:"draw"
      })
    }
  }

  export const newGameInit = async(db,query,id,name) => {
    console.log(name);
    if(!name) name = 'player2'
    set(ref(db,query+'/'+id),{
       id:id,
       player1:{
         ip:'',
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
  export const resetGame = async(db,query,id) => {
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

  export const joinGame = async(db,query,id,name) => {
    update(ref(db,query+'/'+id),{
      player2:{
        ip:'',
        name:name,
        isActive:true
      }
    })
  }

  export const removeGame = async(db,query,id) => {
    console.log(query,id);
   let removeRef = await remove(ref(db,query+'/'+id))
   console.log(removeRef);
  }

  export const leaveGame = async(db,query,id,player) => {
    update(ref(db,query+'/'+id),{
      [`player${player}`]:{
        ip:'',
        name: player === 2 ? 'Waiting for player...' : '',
        isActive:false
      },
      gameStatus:player === 2 ? 'on' : 'hostLeft',
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

    update(ref(db,query+'/player1'),{
      isActive : true
    })
  }

export default firebase;