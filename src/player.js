import { standardFleet, createFleet } from './fleet';
import { initializeBoard } from './board'
import { AI } from './ai';
import {assignSquares} from './utlities'

export const createPlayer = (name) => {
    
    const player = {
        name: name,
        fleet: createFleet(standardFleet),
        allSunk: false,
        board: initializeBoard(),
        attackedSquares: [],
        reset() {
            this.fleet = createFleet(standardFleet);
            this.board = initializeBoard();
            this.attackedSquares = [];
            this.allSunk = false;
        },
        allAssigned() {
            return (this.fleet.every(el=>{return el.assignedPosition}))
        },
        checkSunk() {
            if (this.fleet.every(el => {return  el.sunk === true })) {
                this.allSunk = true;
            }
        },
        logAttackedCoords(resultsObject){
          this.attackedSquares.push(resultsObject)  
        },
        attackValidityCheck(coords) { //checks array for attack, then returns true/false- pushes value to array if true
            console.log('checking validity')
            console.log(coords)
            let validity
            if (coords.x + 1 && coords.y + 1) { //MAY NEED WORK HERE
                console.log('valid coords')
                if (coords.x > 9 || coords.y > 9) {
                    console.log('out of range')
                    validity = false;
                } else if (this.attackedSquares.some(el => {//nested array, needs another .some
                    return el.coordinates.x === coords.x && el.coordinates.y === coords.y
                })) {
                    validity = false;
                } else {
                    validity = true;
                    
                }
            } else { validity = false }
            
            return validity
        },
        receiveAttack(coords) { 
                //results below
                let results = { coordinates: { x: coords.x, y: coords.y } };
                this.board[coords.y][coords.x].attacked = true; //assigns an attacked value 
                

        
                if (this.board[coords.y][coords.x].shipPos) { //marks a hit if ship is in location
                    let attackedShip = this.fleet[this.board[coords.y][coords.x].shipPos.fleetIndex]
                    attackedShip.hit(this.board[coords.y][coords.x].shipPos.posOnShip)
                    results.result = "hit"
                    
                } else {
                   results.result = "miss"
                }
                this.checkSunk();
            return results
        },
        assignShip(initX, initY,vertical,fleetIndex){//this assigns a ship to squares
            let squaresOccupied = assignSquares(initX, initY, fleetIndex, vertical);
            squaresOccupied.forEach((el,index) => {
                //this.board[el.y][el.x].shipPos = { fleetIndex: fleetIndex, posOnShip: index, nameID: this.fleet[fleetIndex].name}
                this.fleet[fleetIndex].assignedPosition = true;
                    this.board[el.y][el.x].shipPos = {fleetIndex: fleetIndex, posOnShip: index, nameID: standardFleet[fleetIndex].ship}
 
            })
        },
        batchAssign(validPlacementArray) {
            this.board = initializeBoard();
            validPlacementArray.forEach((valid, ind) => {
                this.assignShip(valid[0].x,valid[0].y,valid[0].vertical,ind)
            })
        },
        randomShipAssignment() {
            this.reset()
            this.batchAssign(AI.aiPlacement());
        },
        aiAttack() {
            let attack = AI.aiMove(this.attackedSquares)
           return attack
        }
        
    }
    return player;
}