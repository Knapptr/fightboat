import {shipCreator} from './ship';

//array of ship names and spaces

export const standardFleet = [
    {
        ship: "patrol boat",
        length: 2
    },
    {
        ship: "submarine",
        length: 3
    },
    {
        ship: "battleship",
        length: 4
    },
    {
        ship: "destroyer",
        length: 4
    },
    {
        ship: "carrier",
        length: 5
    }
];

export const createFleet=(fleetArray)=>{
    let fleet = [];
    fleetArray.forEach(el => {
        fleet.push(shipCreator(el.ship,el.length))
    })
    return fleet;
}

//module.exports = createFleet
