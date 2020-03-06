import React from 'react';

export const StatsBlock = (props) => {
    let aiHits = props.ai.attackedSquares.filter(e => { return e.result === "hit" })
    let playerHits = props.player.attackedSquares.filter(e => { return e.result === "hit" }) 
    let playerSunk = props.ai.fleet.filter(e => { return e.sunk })
    let aiSunk = props.player.fleet.filter(e=>{return e.sunk})

    return (<div className="statsBlock">
        <table>
            <tr><td>Player Attacks Made</td><td>{props.player.attackedSquares.length}</td></tr>
            <tr><td>Hits</td><td>{playerHits.length}</td></tr>
            <tr><td>Ships Sunk</td><td>{playerSunk.length}</td></tr>
            <tr><td>AI Attacks Made</td><td>{props.ai.attackedSquares.length}</td></tr>
            <tr><td>Hits</td><td>{aiHits.length}</td></tr>
            <tr><td>Ships Sunk</td><td>{aiSunk.length}</td></tr>
        </table>


    </div>
    )
}