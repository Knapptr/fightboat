
import {standardFleet} from './fleet'

export const  placementWrapper = (x, y, fleetId, vertical) => {
            
    let currentLength = standardFleet[fleetId].length
    let maxSquare = 9
    let boardDim = 10
    let returnCoords = [];
    if (!vertical) {
        if (x + currentLength > maxSquare) {
            returnCoords = [boardDim - currentLength,y,fleetId,vertical]
        }else{returnCoords = [x,y,fleetId,vertical]}
    } else if (vertical) {
        if (y + currentLength > maxSquare) {
            returnCoords = [x,boardDim-currentLength,fleetId,vertical]
        }else{returnCoords = [x,y,fleetId,vertical]}
    }
    return returnCoords;
}
export const assignSquares=(initX,initY, fleetID,vertical)=>{ //this returns an array of squares to assign ship placement to. 
    let assignedSquares = []
    let length = standardFleet[fleetID].length
    if (!vertical) {
        for (let i = 0; i < length; i++){
            assignedSquares.push({ x: initX + i, y: initY, vertical})
        }
    } else {
        for (let i = 0; i < length; i++){
            assignedSquares.push({ x:initX,y:initY+i,vertical})
        }
    }
    
    return assignedSquares;        
}
