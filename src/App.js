import React, { Component } from 'react'
import NewGameForm from './components/forms/NewGameForm'
import Game from './containers/Game'
import './App.css'

class App extends Component {
	API_URL = 'https://fishbowl-gameserver.herokuapp.com/'

	state = {
		is_host: false,
		game: undefined,
		message: ''
	}

	handleEnterGame = (roomCode) => {
		fetch(this.API_URL + 'games').then((res) => res.json()).then((games) => {
			const game = games.find((game) => game.room_code === roomCode.toUpperCase())

			if (game && game.round_number === 0) {
				this.setState({ game: game})
			} else {
				this.setState({ message: 'Room not found.'})
			}
		})
	}

	handleCreateNewGame = () => {
		fetch(this.API_URL + 'games', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((game) => this.setState({ game: game, is_host: true, message: '' }))
	}
	
	renderBackgroundEmojis = () => {
		let emojis = ['😂', '🐳', '🐠', '🐳', '🐙', '🐳', '🐠', '😂', '🐙', '😂' ]
		return (
			<div className='area'>
				<ul className='circles'>{emojis.map((emoji, i) => <li key={i}>{emoji}</li>)}</ul>
			</div>
		)
	}

	resetGame = () => {
		this.setState({ game: undefined, is_host: false })
	}

	render() {
		const { game, is_host, message } = this.state

		return (
			<div className='App'>
				{this.renderBackgroundEmojis()}
				{game ? (
					<Game game={game} is_host={is_host} apiUrl={this.API_URL} resetGame={this.resetGame} />
				) : (
					<div>
						<h1 className='heading'>Fishbowl</h1>
						<NewGameForm
							handleEnterGame={this.handleEnterGame}
							handleCreateNewGame={this.handleCreateNewGame}
						/>
						<br />
						<div>
							{message && <small>{message}</small>}
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default App
