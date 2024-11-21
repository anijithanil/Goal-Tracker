import { useState,useEffect,useRef } from "react";
import confetti from 'canvas-confetti';
import "./App.css";
import { Link } from "react-router-dom";

const Goals = [
  {
    title: "homework",
    description: "gytsh sdosijo sodjsojdo sdoijsoidjos siodjsioj",
    percentage: "25%",
    priority: false,
    completed: true,
  },
  {
    title: "work2",
    description: "gytsh sdosijo sodjsojdo sdoijsoidjos siodjsioj",
    percentage: "50%",
    priority: true,
    completed: false,
  },
];

function App() {
  const [isAnimate,setIsAnimate] = useState(false)
  const [goalList, setGoalList] = useState(true);
  const [priority, setPriority] = useState(false);
  const [togglePriority,setTogglePriority] = useState(false)
  const [completed, setCompleted] = useState(false);
  const [data,setData] = useState([])
  const [newPercentage,setNewPercentage] = useState('0')
  const [isVisible,setIsVisible] = useState(true)
  console.log(`is visible ${isVisible}`);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsVisible(false)
    },500)
    return ()=> clearTimeout(timer)
    
    
  },[])
  console.log(`is visible ${isVisible}`);
  

  function handleGoalList() {
    setPriority(false);
    setCompleted(false);
    setGoalList((goalList) => !goalList);
  }
  function handlePriority() {
    setCompleted(false);
    setGoalList(false);
    setPriority(!priority);
  }
  function handleCompleted() {
    setGoalList(false);
    setPriority(false);
    setCompleted(!completed);
  }
  function handleAdd(newData){
    console.log('hndle add');
    
    console.log(newData);
    
    setData((data)=>[...data,newData])
    console.log(data);
    
  }
  function handleRemove(id){
    console.log("remove fun clled");
    const newData = data.filter((ele)=>ele.id!==id)
    setData(newData)
  }
  function handleTogglePriority(id,toggle){

    console.log("toggle clicked app");
    console.log(id,toggle);
    
    const newData = data.map(ele=>{
      if(ele.id ===id ){
        return {...ele,priority:toggle}
      }
      return ele
    })
    setData(newData)
    console.log(newData);
    console.log(data);
    
  }
  function handlePercentage(id,newPercent){
    console.log('percentage app fun called');
    
    if(newPercent==='100'){
       setIsAnimate(true)
       setTimeout(()=>{
          setIsAnimate(false)
       },5000)
    }
    const newperce = data.map(ele=>{
      if(ele.id ===id ){
        if(newPercent ==='100' )
        return {...ele,percentage:newPercent,completed:true}
      else{
        return {...ele,percentage:newPercent}
      }
      }
      return ele
    })
    setData(newperce)
    console.log('handle percentage');
    console.log(newperce);
    
    console.log(data);
    
    
    
  }

  //animation component


  return (
    <div className="container">
      <GoalInput handleAdd={handleAdd} />
      
      <ButtonSection
      
        handleGoalList={handleGoalList}
        handlePriority={handlePriority}
        handleCompleted={handleCompleted}
      />
      <GoalList
        handleTogglePriority={handleTogglePriority}
        handleRemove={handleRemove}
        goalList={goalList}
        handlePercentage={handlePercentage}
        priority={priority}
        completed={completed}
        goals={data}
      />
      {isAnimate && <AnimationEffect/>}
        
      
      
    </div>
  );
}

export default App;

function GoalInput({handleAdd}) {
  const [goalName,setGoalName] = useState('')
  const [goalDesc,setGoalDesc] = useState('')
  

  function handleSubmit(e){
    e.preventDefault();
    if(!goalName || !goalDesc)return ;
    console.log('submit called');
    
    const id =crypto.randomUUID();
    const formData = {
      id,
      name:goalName,
      desc:goalDesc,
      priority:false,
      completed:false,
      percentage:'0'
    }
    setGoalDesc("")
    setGoalName("")
    handleAdd(formData)

  }

  return (
    // <div className="">
    //   <div className=" text-center mt-5">
    //     <h2>What's Your Goal ?</h2>
    //     <form onSubmit={handleSubmit} className="">
    //       <label className="d-flex justify-content-center mt-3 ms-4">
    //         <input 
    //         value={goalName}
    //         onChange={(e)=>setGoalName(e.target.value)}
    //           placeholder="Type Goal Here..."
    //           className="form-control w-25  me-0 d-block"
    //           type="text"
    //         /></label>
          
    //       <label className="d-flex justify-content-center mt-3 ms-4">
    //         <input 
    //         value={goalDesc}
    //         onChange={(e)=>setGoalDesc(e.target.value)}
    //           placeholder="Type Description..."
    //           className="form-control w-25  me-0 d-block"
    //           type="text"
    //         /></label>
    //       <button type="submit " className="btn btn-success mx-3 my-2 px-4">ADD</button>
          
    //     </form>
    //   </div>
    // </div>
    <div className="container">
  <div className="text-center mt-5">
    <h2>What's Your Goal?</h2>
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="d-flex justify-content-center mt-3">
        <input 
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="Type Goal Here..."
          className="form-control w-75 w-md-50"
          type="text"
        />
      </label>
      
      <label className="d-flex justify-content-center mt-3">
        <input 
          value={goalDesc}
          onChange={(e) => setGoalDesc(e.target.value)}
          placeholder="Type Description..."
          className="form-control w-75 w-md-50"
          type="text"
        />
      </label>
      
      <button 
        type="submit" 
        className="btn btn-success mx-auto my-3 px-4"
      >
        ADD
      </button>
    </form>
  </div>
</div>

  );
}

function ButtonSection({ handleGoalList, handlePriority, handleCompleted }) {
  return (
      // <div className="d-flex justify-content-evenly mt-5 bg-light shadow-lg rounded px-5 py-4">
      //   <Button onClick={handleGoalList} bg={"btn btn-primary "} >
      //     Goal List
      //   </Button>
      //   <Button onClick={handlePriority} bg={"btn btn-danger"}>
      //     Priority Based
      //   </Button>
      //   <Button onClick={handleCompleted} bg={"btn btn-success"}>
      //     Completed
      //   </Button>
      // </div>
      <div className="container mt-5 bg-light shadow-lg rounded px-3 py-4">
  <div className="d-flex row justify-content-center gap-1 gap-md-0">
    <div className="col-3 col-md-auto text-center">
      <Button onClick={handleGoalList} bg={"btn btn-primary"}>
        Goal List
      </Button>
    </div>
    <div className="col-3 col-md-auto text-center">
      <Button onClick={handlePriority} bg={"btn btn-danger"}>
        Priority Based
      </Button>
    </div>
    <div className="col-5 ms-2 mt-2 mt-md-0 col-md-auto text-center">
      <Button onClick={handleCompleted} bg={"btn btn-success"}>
        Completed
      </Button>
    </div>
  </div>
</div>

  );
}

function GoalList({ goals, goalList, priority, completed,handleRemove,handleTogglePriority,handlePercentage }) {
  const unCompleted = [];
  return (
    <div className="d-flex justify-content-between flex-wrap">
      {goalList === true &&
        goals
          .filter((goal) => goal.completed !== true)
          .map((goal,key) => <Card handlePercentage={handlePercentage} handleTogglePriority={handleTogglePriority} handleRemove={handleRemove} goal={goal} key={goal.id} />)}
      {priority === true &&
        goals
          .filter((goal) => goal.priority === true)
          .map((goal,key) => <Card handlePercentage={handlePercentage} handleTogglePriority={handleTogglePriority} handleRemove={handleRemove} goal={goal} key={goal.id}  />)}

      {completed === true &&
        goals
          .filter((goal) => goal.completed === true)
          .map((goal,key) => <Card handlePercentage={handlePercentage} handleTogglePriority={handleTogglePriority} handleRemove={handleRemove} goal={goal} key={goal.id} />)}
    </div>
  );
}
function Card({ goal,handleRemove,handleTogglePriority,handlePercentage }) {

    const [toggle,setToggle] = useState(false)
    

    function toggler(id){
      const toggleNewValue = !goal.priority
      setToggle(toggleNewValue)
      console.log('card - ',toggleNewValue);
      
      handleTogglePriority(id,toggleNewValue)
    }
    function handleProgress(id,percent){
      
      handlePercentage(id,percent)
    }


  return (
    <div className="mt-5 rounded d-flex justify-content-start">
      <div className="card d-flex justify-content-start" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{goal.name}</h5>
          
          <p className="card-text">{goal.desc}</p>
          <Button onClick={()=>handleRemove(goal.id)} bg={"btn btn-danger"}>Delete</Button>
          {goal.percentage !== '100' && 
          <div className="btn-group ms-2">
            <button
              type="button"
              className="btn btn-info dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Percentage
            </button>
            <ul className="dropdown-menu">
            <li>
                <button onClick={()=>handleProgress(goal.id,'0')} className="dropdown-item" >
                  0 %
                </button>
              </li>
              <li>
                <button onClick={()=>handleProgress(goal.id,'25')} className="dropdown-item" >
                  25 %
                </button>
              </li>
              <li>
                <button onClick={()=>handleProgress(goal.id,'50')} className="dropdown-item" >
                  50 %
                </button>
              </li>
              <li>
                <button onClick={()=>handleProgress(goal.id,'75')} className="dropdown-item" >
                  75 %
                </button>
              </li>
              <li>
                <button onClick={()=>handleProgress(goal.id,'100')} className="dropdown-item" >
                  100 %
                </button>
              </li>

            </ul>
          </div>
}
          <div className="form-check form-switch mt-3">
            <input
              checked={goal.priority}
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              
              onChange={()=>toggler(goal.id)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Priority
            </label>
          </div>
          <ProgressBar done={goal.percentage}/>
        </div>
      </div>
    </div>
  );
}

function Button({ children, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={bg}
     
    >
      {children}
    </button>
  );
}

function ProgressBar({done}){

    const [style, setStyle] = useState({});
    
    
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      }
      
      setStyle(newStyle);
    }, 200);
    
    return (
      <div className="progress">
        <div className="progress-done" style={style}>
          {done}%
        </div>
      </div>
    )
  

}

// function AnimationEffect(){
 

// const duration = 100000,
// animationEnd = Date.now() + duration,
// defaults = { startVelocity: 25, spread:360, ticks: 140, zIndex: 0, particleSize: 10 };

// function randomInRange(min, max) {
// return Math.random() * (max - min) + min;
// }

// const interval = setInterval(function () {
// const timeLeft = animationEnd - Date.now();

// if (timeLeft <= 0) {
//   return clearInterval(interval);
// }

// const particleCount = 20 * (timeLeft / duration);

// // since particles fall down, start a bit higher than random
// confetti(
//   Object.assign({}, defaults, {
//     particleCount,
//     origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
//   })
// );
// confetti(
//   Object.assign({}, defaults, {
//     particleCount,
//     origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
//   })
// );
// }, 250);



//   return<>

// <div class="github">

// </div>
// <script async="" defer="" src="https://buttons.github.io/buttons.js"></script>
//   </>
// }
function AnimationEffect() {
  const duration = 5000; // Animation duration of 10 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 140, zIndex: 0, particleSize: 10 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Function to create ribbon-like confetti (longer, rectangular particles)
  function createRibbons() {
    const ribbonCount = 10; // Number of ribbons
    for (let i = 0; i < ribbonCount; i++) {
      const angle = Math.random() * 360; // Random angle for ribbon movement
      const speed = 2 + Math.random() * 3; // Speed of ribbons
      const ribbonLength = 300; // Length of ribbon
      const ribbonColor = ["#FF0000", "#FFFF00"]; // Ribbon colors

      // Create ribbon-like confetti (longer, rectangular confetti)
      confetti({
        ...defaults,
        startVelocity: 5,
        spread: 30,
        ticks: 100,
        particleCount: 1,
        angle: angle,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ribbonColor,
        shapes: ["square"], // Use square shapes for a ribbon-like appearance
        gravity: 0.2,
        scalar: 1.5, // Larger size to simulate ribbons
      });
    }
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval); // Stop the animation when time is up
    }

    const particleCount = 20 * (timeLeft / duration);

    // Create falling confetti particles from the left side
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
    );
    // Create falling confetti particles from the right side
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    );

    // Create confetti ribbons during the animation
    createRibbons();
  }, 250);

  return (
    <>
      <div className="github">
        {/* You can add any additional content here */}
        <h1>You Have achived your Goal congrats!...</h1>
      </div>
      <script async="" defer="" src="https://buttons.github.io/buttons.js"></script>
    </>
  );
}

