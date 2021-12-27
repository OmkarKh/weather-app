import { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [query, setQuery] = useState('')
  const [condition, setCondition] = useState([])

  const url = `http://api.weatherstack.com/current?access_key=a7e00b216bd19a4707e9cd88b630d64f&query=${query}`
  const getData = async () => {
    const response = await axios.get(url)
    setCondition([response.data]) //response.data is an object
    console.log(response.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getData()
  }

  return (
    <div className="App">
      <h1>Weatherly</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder='Enter city' required />
        </label>
        <button type='submit'>Submit</button>
      </form>

      {condition.map((item, index) => (
        <div key={index} className='card'>
          <div>
            <img src={item.current.weather_icons} alt="" />
            <h2>{item.location.name}, {item.location.country}</h2>
            <div className='grid'>
              <div className='temp'>
                <h3>Temp: <em>{item.current.temperature}°C</em></h3>
                <p>Feels like {item.current.feelslike}°C</p>
              </div>
              <h3>Humidity: <em>{item.current.humidity}%</em></h3>
              <h3>Pressure: <em>{item.current.pressure}mb</em></h3>
              <h3>{item.current.weather_descriptions}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
