

export const shipCreator = (name, length) => {
    let generateHitStatus = (length) => {
        let hitArray = []
        for (let i = 0; i < length; i++){
            hitArray.push(false)
        }
        return hitArray
    }
    let ship = {
        name: name,
        length: length, 
        sunk: false,
        hitStatus: generateHitStatus(length),
        assignedPosition: false,

        assignToggle() {
            this.assignedPosition = !this.assignedPosition;
        },
        
        isSunk() {
            if (this.hitStatus.every(el => el)) {
                this.sunk = true;
            }
        },
        hit(point) {
            this.hitStatus[point] = true;
            this.isSunk();
        }

    }

    return ship
}

