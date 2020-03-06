import React, { Component } from 'react';
import {attackBoardArranger} from './boardRenderUtilities'

export class AttackBoard extends Component{
    render() {
        return (
            <div>
                <div className="bolded centered boardTitle">Attack Coordinates</div>
                <div id="attackBoard" className="boardElement">
                    {attackBoardArranger(this.props.player,this.props.clickHandler)}
                </div>
            </div>
        )
    }
}