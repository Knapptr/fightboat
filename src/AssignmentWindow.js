import React from 'react';
import { DefendBoard } from './defendBoard';


export const Assignment = (props) => {
    const readyToPlay = () => {
        if (props.player.allAssigned()) {
            return(
            <p className="bolded clickable " onClick={props.start}>Click to Start</p>)
        } else {
            return <p>Choose a Placement</p>
        }
    }
    return (
        <div>
            <div id="assignmentBoard">
                <DefendBoard player={props.player} />
                </div>
                <div className="buttons">
                        <button onClick={props.assigner}>Randomize Ship Placement</button>
                        {readyToPlay()}
                </div>
            
        </div>
    )
}