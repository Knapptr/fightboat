import React, { Component } from "react";
import {defendBoardArranger} from "./boardRenderUtilities"

export class DefendBoard extends Component{
    render() {
        return (
            <div>
                <div className="bolded centered boardTitle">Your Fleet</div>
                <div id="defendBoard" className="boardElement">
                    {defendBoardArranger(this.props.player.board)}
                </div>
            </div>
        )
    }
}