import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';

import logo from './assets/image/get_pickled_logo_black.svg'; // Tell Webpack this JS file uses this image
import { ReactComponent as GetPickledLogo } from "./assets/image/get_pickled_logo_black.svg"

var card_templates = [
	["rule", "You, make an animal noise every time you drink until it's your turn again."],
	["challenge", "You, get the attention of the person across from you in a socially unacceptable way."],
	["challenge", "You, say something you've done. Everyone, if you've never done it, drink"],
	["rule", "Everyone, only speak using one-syllable words until it's your turn again."],
	["activity", "You, say a letter, the person after you says another. Keep going until someone completes a word, that person has to drink."],
	["activity", "Everyone, the floor is lava! The last person to still have their feet on the ground drinks."],
	["activity", "You, ask the player to your right for a song. You, choose a word from the song. Play the song. Every time the word is said, everyone drink. (You may look up lyrics.)"],
	["challenge", "You, choose a player, let them take a pen and give you a tattoo."],
	["challenge", "You, let another player mix a cocktail for you out of whatever drink is available and take a hearty gulp."],
	
	["rule", "You, don't laugh until it is your turn again."],
	["rule", "You, you cannot make eye contact with anyone until your next turn."],
	["rule", "You, keep your eyes closed until your next turn."],
	["challenge", "You, switch shirts another player for the remainder of the game, if everyone refuses or you physically can't, drink."],
	["challenge", "You, the person after you can dare you to do anything. You can fulfill the dare or drink."],
	["challenge", "You, tell another player either a truth or a lie about yourself. If they guess correctly you drink, otherwise they drink."],
	["challenge", "You, flip a coin. If it's heads, you drink. If it's tails, everyone else drinks."],
	["challenge", "You, tell another player either a truth or a lie about yourself. If they guess correctly you drink, otherwise they drink."],
	["challenge", "You, pick a person and start a staring contest. Loser drinks"],
	["challenge", "You, tell another player either a truth or a lie about yourself. If they guess correctly you drink, otherwise they drink."],
	["challenge", "You, pick a person to play rock paper scissors with. Loser drinks."],
	["challenge", "You, tell another player either a truth or a lie about yourself. If they guess correctly you drink, otherwise they drink."],
	["activity", "Everyone, last person to clap their hands drinks."],
	["activity", "Everyone, vote on who is the most likely to get kicked out of a bar. That person drinks"],
	["activity", "Everyone, vote on who is the nicest. That person picks someone to drink."],
	["activity", "Everyone, vote on who is the most likely to spend all their money on something stupid. That person drinks."],
	["activity", "Everyone, vote who is most likely to argue with a stranger. That person drinks"],
	["activity", "Everyone, the first person to laugh or talk drinks."],
	["rule", "You, make up a rule! Everyone must follow it until your next turn or drink."],
	["activity", "You, Imitate another player. First person to guess correctly picks someone to drink."],
	["activity", "You, hum a song of your choice. First person to guess correctly picks someone to drink."],
	["activity", "Everyone, take turns around the room. Each person performs a new action, as well as all previous actions. First person to mess up drinks."],
	["activity", "Everyone, without touching anything (except mobility aids), everyone must balance on one leg. First person to fall drinks."],
	["activity", "You, hum a song of your choice. Firstperson to guess correctly picks someone to drink."],
	["activity", "Everyone, vote on who is the most likely to dodge drinks. That person drinks."],



]

var cards_played = 0;

class CardData {
	type: ""
	effect: ""
	rotation: 0
	offsetx: 0
	offsety: 0
	constructor(t, e, r, x, y) {
		this.type = t
		this.effect = e
		this.rotation = r
		this.offsetx = x
		this.offsety = y
	}
}

const Card = (data, render) => {
	if (data.data == undefined || render == false) {
		return(
			<div></div>
		);
	}
	var color = "coral"
	if (data.data.type == "everyone") {
		color = "teal"
	}
	if (data.data.type == "rule") {
		color = "purple"
	}
	if (data.data.type == "activity") {
		color = "rgb(220,40,60)"
	}
	console.log(data.data)

	return (
		<div className="card" style={{transform: `rotate(${data.data.rotation}deg)`, top:`${data.data.offsety}vh`, left:`${data.data.offsety}vh`}}>
			<div className="header" style={{backgroundColor:`${color}`}}>
				<div className="header_text">
					{data.data.type}
				</div>
			</div>
			<div className="card_text">
				{data.data.effect}
			</div>
			<div class="card_logo">
				<GetPickledLogo></GetPickledLogo>
			</div>
		</div>
	);
}

class ClickHandler extends React.Component {
	  static defaultProps = {
		onAnyClick: () => {}
	  };

	  componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	  }

	  componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	  }

	  handleClickOutside = (event) => {
		this.props.onAnyClick();
	  };

	  render() {
		const { children } = this.props;

		return <div ref={this.wrapperRef}>{children}</div>;
	  }
}

var cards = []

function generateCardStack() {
	cards = []
	card_templates.forEach((data, index) => {
		cards.push(new CardData(data[0], data[1], (Math.random() * 6)-3, (Math.random() * 2), (Math.random() * 2)+1))
	});
	for (let i = 0; i < cards.length; i++) {
		var a = Math.floor(i + (Math.random() * (cards.length-i)))
		var swap = cards[a]
		cards[a] = cards[i]
		cards[i] = swap
	} 
	console.log(cards)
}
generateCardStack()

const Game = () => {
	const [cards_shown, set_cards_shown] = useState(1);
	
	const cardsJsx = []
	var i = 0
	do {
		cardsJsx.push(
			<Card key={i} data={cards[i]}/>
		)
		i = i + 1
	} while (i < cards.length && i < cards_shown)

	const nextCard = () => {
		set_cards_shown(cards_shown + 1)
		if (cards_shown > cards.length - 1) {
			set_cards_shown(1)
			generateCardStack()
		}
	}
	return (
		<ClickHandler
			onAnyClick={nextCard}
		>
			<div className="game">
				{cardsJsx}
			</div>
		</ClickHandler>
	);
}


var game = <Game />

//window.onclick = () => {
//	game.nextCard()
//}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(game);