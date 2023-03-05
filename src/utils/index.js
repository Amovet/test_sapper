import {Mine, size} from "./const";
import {createBoard} from "./createBoard";
import block_0 from "../assets/block_0.png";
import block_1 from "../assets/block_1.png";
import block_2 from "../assets/block_2.png";
import block_3 from "../assets/block_3.png";
import block_4 from "../assets/block_4.png";
import block_5 from "../assets/block_5.png";
import block_6 from "../assets/block_6.png";
import block_7 from "../assets/block_7.png";
import block_8 from "../assets/block_8.png";
import _0 from "../assets/0.png";
import _1 from "../assets/1.png";
import _2 from "../assets/2.png";
import _3 from "../assets/3.png";
import _4 from "../assets/4.png";
import _5 from "../assets/5.png";
import _6 from "../assets/6.png";
import _7 from "../assets/7.png";
import _8 from "../assets/8.png";
import _9 from "../assets/9.png";
import React from "react";

export const FixBoard = (board,pos,setBoard) =>{
    let newBoard = board
    while(newBoard[pos]==Mine){
        newBoard=createBoard(size)
    }
    setBoard(newBoard)
}

export const getNumberBlockIco=(number)=>{
    if(number==0){return <img src={block_0} className='ico'/>}
    if(number==1){return <img src={block_1} className='ico'/>}
    if(number==2){return <img src={block_2} className='ico'/>}
    if(number==3){return <img src={block_3} className='ico'/>}
    if(number==3){return <img src={block_4} className='ico'/>}
    if(number==3){return <img src={block_5} className='ico'/>}
    if(number==3){return <img src={block_6} className='ico'/>}
    if(number==3){return <img src={block_7} className='ico'/>}
    if(number==3){return <img src={block_8} className='ico'/>}
}
export const getTime=(time)=>{
    let stringTime = String(time)
    return (
        <>
            <img src={_0} className='time__ico'/>
            {time<10?<img src={_0} className='time__ico'/>:null}
            {getTimeImg(stringTime.slice(0,1))}
            {getTimeImg(stringTime.slice(1,2))}
        </>
    )

}
export const getTimeImg=(time)=>{
    return (
        <>
            {time=='0'?<img src={_0} className='time__ico'/>:null}
            {time=='1'?<img src={_1} className='time__ico'/>:null}
            {time=='2'?<img src={_2} className='time__ico'/>:null}
            {time=='3'?<img src={_3} className='time__ico'/>:null}
            {time=='4'?<img src={_4} className='time__ico'/>:null}
            {time=='5'?<img src={_5} className='time__ico'/>:null}
            {time=='6'?<img src={_6} className='time__ico'/>:null}
            {time=='7'?<img src={_7} className='time__ico'/>:null}
            {time=='8'?<img src={_8} className='time__ico'/>:null}
            {time=='9'?<img src={_9} className='time__ico'/>:null}
        </>
    )

}