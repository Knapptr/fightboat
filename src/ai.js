
import {placementWrapper,assignSquares} from './utlities'

export const AI = {

    aiPlacement(){
        //rando x,y.randoVert boolean check all squares in assignSquares,
        //if squares aren't assigned, then coords are valid.
        //assign ship, move to next ship
        //fleet loop
        let placementArray = [];
        for (let i = 0; i < 5; i++) {
            let assignment;
            let vertValue;
            let valid;
            do {
                valid = true;
                vertValue = !!Math.floor(Math.random() * 2);
                let coords = this.randomCoord();
                let validCoord = 
                placementWrapper(coords.x, coords.y, i, vertValue)
                assignment = assignSquares(...validCoord);
                assignment.forEach(assignedSquare => {
                    if (placementArray.some(placedShip => {
                        
                        return (placedShip.some(placedSquare => {
                            return (placedSquare.x === assignedSquare.x && placedSquare.y === assignedSquare.y)
                        }))
                    })){
                        valid = false;
                        }
                   
                })
                
                
            } while (valid === false)
            
            placementArray.push(assignment)
            
        }
       return placementArray
    },

    randomPoint(){
        return Math.floor(Math.random() * 10);
    },
    
    randomCoord(){
        return { x: this.randomPoint(), y: this.randomPoint() };
    },
    betterGuess(coords) {
        const either = () => { return Math.floor(Math.random() * 2) }
        let addOrSub;
        let nextGuess = { x: -1, y: 10 }
        let count = 1;
        while ((nextGuess.x < 0 || nextGuess.y < 0) || (nextGuess.y > 9 || nextGuess.x > 9)) {
            count++
            if (either() === 0) {
                addOrSub = 1;
            } else {
                addOrSub = -1
            }
            if (either() === 0) {
                nextGuess = { x: coords.coordinates.x + addOrSub, y: coords.coordinates.y }
            } else {
                nextGuess = { x: coords.coordinates.x, y: coords.coordinates.y + addOrSub }
            }
            if (count >= 4) {
                nextGuess = this.randomCoord();
            }
        }
        
        return nextGuess;
    },

    aiMove(arrayofAttacks){
            
        let genCoord;
        let duplicate = true
        let lastAttack;
        if (arrayofAttacks.length > 0) {
            
            lastAttack = arrayofAttacks[arrayofAttacks.length - 1]
        }else { lastAttack = undefined}

        do {
            if (lastAttack && lastAttack.result=== "hit") {
                genCoord = this.betterGuess(lastAttack);
            } else {
                genCoord = this.randomCoord();
            }
            duplicate = arrayofAttacks.some(el => { return (genCoord.x === el.coordinates.x && genCoord.y === el.coordinates.y) })
           
            
        } while (duplicate === true);
        return genCoord;
        
    },
    

}
