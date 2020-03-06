export const initializeBoard = () => {
    const squares = [];
    for (let i = 0; i < 10; i++) { //rows
        let row = []
        for (let x = 0; x < 10; x++) {//cols
            row.push({ x: i, y: x, id: `${String.fromCharCode(i + 65) + x}`, shipPos: false, attacked: false });
        }
        squares.push(row);
    }
    const attack = (coords) => { //coords given in {x:,y:}
        
    }

    return squares
};


