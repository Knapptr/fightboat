import React from 'react';
import {AttackSquare,DefendSquare} from './boardSquare'



export const attackBoardArranger = (playerObject, clickHandler) => {
    let board = playerObject.board
    return board.map((el, xAxis) => { //rows
        return (
            <div className="row">
        
                {el.map((x, yAxis) => {
                    return <AttackSquare attackArray={playerObject.attackedSquares}clickHandler={clickHandler} key={x.id} x={xAxis} y={yAxis} squareID={x.id} />
                })}
    
            </div>
        
        )
   })
}
export const defendBoardArranger = (boardArray) => {
    return boardArray.map((el, xAxis) => { //rows
        return (
            <div className="row">
        
                {el.map((x, yAxis) => {
                    return <DefendSquare key={x.id} squareID={x.id} shipPos={boardArray[xAxis][yAxis].shipPos} attackState={boardArray[xAxis][yAxis].attacked} />
                })}
    
            </div>
        
        )
   })
}