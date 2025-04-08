import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'
import { Dota2, DOTA2GSI } from "dotagsi";
import DraftComponent from './components/Draft';
import { League } from "./../interface/interface"
import './App.css';
import Author from './components/other/Author';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface ExtendedDota2 extends Dota2 {
	league: League;
}

function App() {
	let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	const [data, setData] = useState<ExtendedDota2 | null>(null)

 
	

	const SOCKET_SERVER_URL = `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
  console.log(SOCKET_SERVER_URL)

	useEffect(() => {
		socket = io(SOCKET_SERVER_URL)  
		
		socket.on('data', (data) => {
			setData(data)
		})

		//Cleanup
		return () => {
			socket.disconnect()
		}
	}, [])

	if (!data || !data.draft || !data.map || !data.league || !data.players) return null;
	return (
		<div className="app">
			<DraftComponent
				draft={data.draft}
				map={data.map}
				league={data.league}
				players={data.players}
			/>
			<Author name="João Gil" email="joaopedromgil2@gmail.com"/>
		</div>
	);
}

export default App;
