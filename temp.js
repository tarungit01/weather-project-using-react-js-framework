//api.openweathermap.org/data/2.5/weather?q=delhi&appid=c45b1fa7b2a93789e0db26715e5630a6

import React, {useState, useEffect} from 'react';
import Weathercard from "./weathercard";
import './style.css';

const Temp = () => {
		const [searchValue, setSearchValue] = useState("");
		const [tempInfo, setTempInfo] = useState({});

		const getWeatherInfo = async () => {
			try {
				let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c45b1fa7b2a93789e0db26715e5630a6`;

				let res = await fetch(url);
				let data = await res.json();

				const { temp, humidity, pressure } = data.main;
				const { main: weathermood } = data.weather[0];
				const { name } = data;
				const { speed } = data.wind;
				const { country, sunset } = data.sys;


				const myNewWeatherInfo = {
					temp,
					humidity,
					pressure,
					weathermood,
					name,
					speed,
					country,
					sunset,
				};

				setTempInfo(myNewWeatherInfo);

			} catch(error) {
				console.log(error);
			}
		};


		useEffect(() => {
			getWeatherInfo();
		}, []);

	return (

		<>
			<div className="wrap">
				<div className="search">
					<input 
					type="search" 
					placeholder="search..."
					autoFocus
					id="search"
					className="searchTerm"
					value={ searchValue }
					onChange={(event) => setSearchValue(event.target.value) }
					/>

					<button 
					className="searchButton" type="button" 
					onClick={getWeatherInfo}>
					Search
					</button>
				</div>
			</div>
			<Weathercard {...tempInfo} />
		</>
	);

};


export default Temp;