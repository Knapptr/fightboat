import React, { Component } from 'react';
import { createPlayer } from './player';
import { AttackBoard } from './attackBoard';
import { DefendBoard } from './defendBoard';
import { AI } from './ai';
import { Assignment } from './AssignmentWindow'
import { FleetStatus } from './fleetstatus'
import {StatsBlock} from './stats'
export class Game extends Component{
    state = {
        humanPlayer: createPlayer('human'),
        aiPlayer: createPlayer('ai'),
        humanTurn: true,
        gameOver: false,
        message: "Place your ships...",
        gamePlaying: false,

    }
    resetGame = () => {
        this.setState(
            {
                humanPlayer: createPlayer('human'),
                aiPlayer: createPlayer('ai'),
                humanTurn: true,
                gameOver: false,
                message: "Place your ships...",
                gamePlaying: false,
            })
        }
    gameOverMessage = () => {
        if (this.state.humanPlayer.allSunk) {
            return <h1 className="centered">You Lose.</h1>
        } else {
            return <h1 className="centered">You Win!</h1>
        }
    }
    playerAssign = () => {
        this.setState((state) => {
            let player = state.humanPlayer;
            player.randomShipAssignment();
            return { humanPlayer: player }
        })
    }
    startGame = () => {
        this.setState((state) => {
            let ai = state.aiPlayer
            ai.randomShipAssignment()
            return { gamePlaying: true, aiPlayer:ai,message:"Awaiting Attack Coordinates..."}
        })
    }
    aiMove = () => {
        if(!this.state.humanTurn && !this.state.gameOver){ //if player makes invalid move- AI move will not fire
            this.setState({ message: "Returning Fire" }, () => {
                setTimeout(() => {
                    this.setState(state => {
                        let ai = state.aiPlayer;
                        let human = state.humanPlayer;
                        let humanTurn = state.humanTurn;
            
                        ai.logAttackedCoords(human.receiveAttack(ai.aiAttack()));
                        return { humanPlayer: human, aiPlayer: ai, humanTurn: true, message: "Awaiting Attack Coordinates." }
                    })
                }, 500)
            })
        }
    }
    takeTurn=(coords)=> {
        if (this.state.humanTurn) {
            this.setState(state => {
                let gameOver;
                let message;
                let ai = state.aiPlayer;
                let human = state.humanPlayer;
                let humanTurn = state.humanTurn;
                if (human.attackValidityCheck(coords)) {
                    human.logAttackedCoords(ai.receiveAttack(coords))
                    humanTurn = !humanTurn
                    if (ai.allSunk) {
                        gameOver = true;
                        message = "Game Over!"
                    } else { gameOver = false }
                    return { humanPlayer: human, aiPlayer: ai, humanTurn: humanTurn, gameOver: gameOver, message: message }
                } else { alert('invalid attack!') }
                
            },this.aiMove)
        }
        
    }
//     checkOver() {
//         if (this.state.humanPlayer.allSunk || this.state.aiPlayer.allSunk) {
//             this.setState({ gameOver: true,message: "Game Over!" });
//        }
//    }
    render() {
        let display;
        if (!this.state.gamePlaying) {
            display = <div id="displayBoard"><Assignment player={this.state.humanPlayer} assigner={this.playerAssign} start={this.startGame}/></div>
        } else {
            if (!this.state.gameOver) {
                display = (
                    <div id="playBoard">

                        <AttackBoard player={this.state.humanPlayer} clickHandler={this.takeTurn} />
                        <div id="statusBar">
                            <FleetStatus player={this.state.aiPlayer} name="enemy"/>
                            <FleetStatus player={this.state.humanPlayer} name="player"/>
                        </div>
                            <DefendBoard player={this.state.humanPlayer}/>
                    </div>
                        
                        
                    
                )
            } else {
                display = (
                    <div id="gameOverScreen">
                        {this.gameOverMessage()}
                        <StatsBlock player={this.state.humanPlayer} ai={this.state.aiPlayer}/>
                        <button onClick={this.resetGame}>Play Again</button>
                    </div>
                )
            }
        }
        return (
            
            <div id="boardWindow">
                <div id="messageBar" className="centered">{this.state.message}</div>
                
                {display}
            </div>
        )
    } 
}