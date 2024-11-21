import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const [position, setPosition] = useState({ top: "50%", right: "50%" })
  const [timings, setTimings] = useState([])
  const [timeInterval, setTimeInterval] = useState(1)
  const [gameOn, setGameOn] = useState(false)
  const [startTime,setStartTime]=useState("")

  const [isVisible, setIsVisible] = useState(false)

  
  const toggleGame = (type) => {
    let inter;
    if (type === "pause") {
      
      
      return clearInterval(inter);;
    }

    setStartTime(new Date());
    setGameOn(true)
    setIsVisible(true);
     inter = setInterval(() => {
      const random = Math.floor(Math.random() * 100)
      setIsVisible(prev => !prev)
      setPosition({ top: `${random}%`, right: `${random}%` })
     

    }, timeInterval * 1000)


    





  }

  const DotClick = () => {
    const date = new Date();
    
    if (timings.length === 0) {
      const statdate=new Date(startTime)
     let rect=(date.getUTCMilliseconds()-statdate.getUTCMilliseconds())/1000;
      if(rect<0)
      {
        rect=rect*-1;
      }
     
      // setStartTime(date);
      setTimings([{ mouseClick: 1, reactionTime: timeInterval+(rect) }])
      
    }
    else {
      setTimings(prev => {
        const lastEntry = prev[prev.length - 1];
      
      
        const statdate=new Date(startTime)
        let rect=(date.getUTCMilliseconds()-statdate.getUTCMilliseconds())/1000;
       
        if(rect<0)
          {
            rect=rect*-1;
          }
          console.log(rect)
        return [
          ...prev,
          { mouseClick: lastEntry.mouseClick + 1, reactionTime: lastEntry.reactionTime+(rect) }
        ]
      })
    }
    setIsVisible(false);


  }


  console.log(timings)
 


  const reset = () => {
    setGameOn(false);
    setTimings([]);
    
    
  }

  return (
    <div className="App">

      <div className='header'>

        <div className='btns'>
          <button onClick={() => toggleGame("start")} >Start</button>
          <button onClick={() => toggleGame("pause")} >Pause</button>
          <button onClick={reset} >Reset</button>
        </div>
        <input type="number" min={1} max={10} value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)} />
      </div>
      <div className='playArea'>
        {
          isVisible &&
          <span onClick={DotClick} className='dot' style={{ top: position.top, right: position.right }}>

          </span>
        }
      </div>

      <table className='clickTable'>
        <tr>
          <th>
            Mouse Click Number
          </th>
          <th>
            Reaction Time
          </th>
        </tr>
        {
          timings.map((item, index) => {
            return (
              <tr>
                <td>{item.mouseClick}</td>
                <td>{item.reactionTime}</td>
              </tr>
            )
          })
        }
      </table>

    </div>
  );
}

export default App;
