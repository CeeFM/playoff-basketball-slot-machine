import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ApplicationViews } from './components/views/ApplicationViews';
import { Authorized } from './components/views/Authorized';
import { PlayerPick } from './components/game/PlayerPick';

export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<ApplicationViews />
				</>
			</Authorized>

		} />
    		<Route path="/draft" element={<PlayerPick />} />
	</Routes>
}
