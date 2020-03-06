import React, { Component } from 'react'

const attackRenderLogic = (coordinates, arrayofAttacks) => {
    let className;
    let arrayResult = arrayofAttacks.find(el=>{return el.coordinates.x===coordinates.x&&el.coordinates.y===coordinates.y})
    if (arrayResult) {
        if (arrayResult.result === "hit") {
            className = "attackHit"
        } else {className = "attackMiss"}
    }
    
    //if current square & miss: class of attackMiss
    return className
}
const defendRenderLogic = (props) => {
    let className
    if (props.attackState) {
        if (props.shipPos) {
            className = "attackHit"
        } else {
            className = "attackMiss"
        }
    } else {
        return null
    }
    return className;
}
export const AttackSquare = (props) =>{
    
        return (
            <div onClick={() => {
                props.clickHandler({x:props.x,y:props.y})
                
            }} className={"boardSquare attack " + attackRenderLogic({x:props.x,y:props.y},props.attackArray)}>
                {props.squareID}
                
            </div>
        )
    
}
export const DefendSquare = (props) => {
    return (
        <div className={"boardSquare defend " + (props.shipPos ? "ship" : "empty") + " "+ defendRenderLogic(props) }>
                {props.squareID}
                
            </div>
    )
}