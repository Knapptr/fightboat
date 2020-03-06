import React from 'react';

export const FleetStatus = (props) => {
    let fleet = props.player.fleet;
    const statusArranger = () => {
        return fleet.map(el => {
            return <tr><td className={el.sunk?"sunkStatusText":"operationStatusText"}>{el.name}</td><td>{el.length}</td><td className={(el.sunk?"sunkStatusText":"operationStatusText") + " "+"statusBulb"}><i className="fas fa-circle"></i></td></tr>
        })
    }

    return (
        
        <div className="fleetStatus">
            <p className="bolded centered statusTitle">{props.name.toUpperCase() + " fleet Status"}</p>
                <table>
                <tr><th>Ship</th><th>Size</th><th>Status</th></tr>
                {statusArranger()}
                </table>

            </div>
            
       
        
    )
}