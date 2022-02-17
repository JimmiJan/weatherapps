// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
//   import React, { useEffect, useState } from 'react'
//   import "./App.css"

//   import Img from "./images/moon.png"
//   const App = () => {

//     const [weatherdata,setweatherdata] = useState({})
//     const [city,setcity] = useState("")
//     const [search,setsearch] =useState("karachi")


//     useEffect(()=>{
//      fetch(
//        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d3c4cd8f61fff7213fe085c61c8268cb&units=metric`
//      )
//      .then((res)=> res.json())
//      .then((result)=>{
//         // console.log(result)
//         setweatherdata(result)
//       })
//       .catch((err)=>{
//         console.log(err)
//       })
//     }, [city])

//     const citis= (e)=>{

//      e.preventDefault()
//       setCityValue(value)
//       console.log(cityValue)
//     }

//     return (
//       <div className='mainbox'>
//           <div className='d-flex alien-item-right justify-content-left my-3'

//           style={{flexDirection :'column'  , alignItems: "center" ,}}>

//             <input type="text" value={city} placeholder='Enter Your City' 

//             onChange={(e)=>{setcity(e.target.value)}} 

//             className='sss form-control  w-5 ' />

//              {/* <button onClick={citis} className='btn btn-primary my-2'>

//                   City Name
//             </button>  */}
//           </div>

//         <div className='whather'>


//             <div className='imgs'>
//               <img src={Img} width={200} alt="" />

//             </div>  
//             <div className='wahterupdate'>
//               <ul>
//                 <li>Today </li>
//                 <li>City Name {weatherdata && weatherdata.name }</li>
//                 <li>Temprature {weatherdata && weatherdata.main && weatherdata.main.temp}</li>

//                 <li>Weather {weatherdata && weatherdata.weather &&
//                weatherdata.weather[0] &&
//                weatherdata.weather[0].main} </li>
//               </ul>

//             </div>


//         </div>



//       </div>
//     )
//   }

//   export default App




import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  const [search,setsearch] =useState("Karachi")
  const [data,setdata] =useState([])
  const [input,setinput] =useState("")
  let componet = true
useEffect( ()=>{
  const fetchweather = async ()=>{
    const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=49534492cf28aae1f63d813072439cb9`)
    if(componet){
      setdata(await responce.json())
      console.log(data)
    }
    return ()=>{
      componet=false
    }
  }
  fetchweather()
},

[search]

)

let emoji=null
if(typeof data.main != "undefined"){
  if(data.weather[0].main == "cloud"){
    emoji = "fa-cloud"
  }
  else if(data.weather[0].main == "Thundersstrom"){
    emoji = "fa-bolt"
  }
  else if(data.weather[0].main == "drizzle"){
  emoji = "fa-cloud-rain"
  } else  if(data.weather[0].main == "rain"){
  emoji = "fa-cloud-shower-haevy"
  }else  if(data.weather[0].main == "snow"){
  emoji = "fa-snow-flake"
  }else{
  emoji="fa-smog"}
  
}else{
  return(
    <div>...loading</div>
  )
   
  
}

let am= (data.main.temp - 273.15).toFixed(2)
// let temp1= (data.main.temp_min - 273.15).toFixed(2)
// let temp2= (data.main.temp_max - 273.15).toFixed(2)


let d = new Date()
let date =d.getDate()
let year =d.getFullYear()
let month =d.getMonth()
let day =d.toLocaleTimeString("default", {weekday:"long"})


let time = d.toLocaleDateString([],{
  hour:"2-digit",
  minute:"2-digit",
  second:"2-digit"
})
const handleSubmit = (e) =>{
  e.preventDefault();
  setsearch(input)
}
  return (

    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card  text-white text-center">
              <img src="https://source.unsplash.com/600x900/?nature,water" class="card-img" alt="..." />
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit} >

                  <div class="input-group mb-3">
                    <input type="text"
                    name='search'
                    value={input}
                    onChange={(e)=>setinput(e.target.value)} required
                    class="form-control" placeholder="Search City"
                     aria-label="Search City" aria-describedby="basic-addon2" />

                    <button  type='submit' class="input-group-append btn btn-primary">
                     <i className=''>Search</i>
                    </button >
                  </div>
                </form>
                <div className="bg-dark bg-opacity-0.4 c py-3">
                <h5 class="card-title">{data.name}</h5>
                <p class="card-text lead">{day} {month} {date} , {year}</p>
                <hr />
                <i class={`fas ${emoji} fa-4x`}></i>
                <h1> {am} <sup>o</sup></h1>
                <p className='lead'>{data.weather[0].main}</p>
                <p className='lead'> {am} <sup>o</sup> | {am} <sup>o</sup></p>
                <p class="card-text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
