import './App.css';
import DraftComponent from './components/Draft';
import Author from './components/other/Author';
import Controller from './components/other/Controller';
import Status from './components/other/Status';
import { useSocket } from './helper/useSocket';

function App() {
	
	const { data } = useSocket();

	console.log(data)

	return (
		<div className="app">

			{data && data.draft && data.map && data.league && data.players && (
				<DraftComponent
					draft={data.draft}
					league={data.league}
					players={data.players}
				/>
			)}
			<Status data={data}/>
			<Author name="João Gil" email="joaopedromgil2@gmail.com" />
			<Controller />
		</div>
	);
}

export default App;
