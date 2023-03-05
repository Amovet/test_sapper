import React, {useState, useMemo, useEffect} from 'react';
import './App.css';
import {createBoard} from "./utils/createBoard";
import {Mine, size} from "./utils/const";
import {FixBoard, getNumberBlockIco, getTime, getTimeImg, RestartGame} from "./utils";
import flagIco from '../src/assets/flag.png'
import questionIco from '../src/assets/quest.png'
import initBlock from '../src/assets/init_block.png'
import bomb from "./assets/bomb.png";
import bomb_exp from "./assets/bomb_exp.png";
import initIco from "./assets/init.png";
import winIco from "./assets/win.png";
import lossIco from "./assets/lose.png";


const Mask = {
    Transparent: 0,
    Fill: 1,
    Flag: 2,
    Question: 3,
};

const mapMaskToView = {
    [Mask.Transparent]: null,
    [Mask.Fill]: <img src={initBlock} className='ico'/>,
    [Mask.Flag]: <img src={flagIco} className='ico'/>,
    [Mask.Question]: <img src={questionIco} className='ico'/>,
};

export default function App() {
    const dimension = new Array(size).fill(null);
    const [minutes, setMinutes] = useState(40);
    const [seconds, setSeconds] = useState(0);
    const [isEnd, setIsEnd] = useState({min: 40, sec: 0});
    const [death, setDeath] = useState(false);
    const [count, setCount] = useState(0);
    const [expBomb, setExpBomb] = useState(false);
    const [board, setBoard] = useState(() => createBoard(size));
    const [mask, setMask] = useState(() => new Array(size * size).fill(Mask.Fill));

    useEffect(() => {
        if (count > 0) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }
    });

    const win = useMemo(
        () =>
            !board.some((f, i) => f === Mine && mask[i] !== Mask.Flag && mask[i] !== Mask.Transparent),
        [board, mask]
    );

    useEffect(() => {
        if (win == true) {
            setIsEnd({min: minutes, sec: seconds})
        }
        if (death == true) {
            setIsEnd({min: minutes, sec: seconds})
        }
    }, [win])

    const viewBlocks = (maskElem, boardElem, index) => {
        if (maskElem !== Mask.Transparent) {
            return mapMaskToView[maskElem]
        } else {
            if (boardElem === Mine) {
                if (index == expBomb) {
                    return <img src={bomb_exp} className='ico'/>
                } else {
                    return <img src={bomb} className='ico'/>
                }
            } else {
                return getNumberBlockIco(boardElem)
            }
        }

    }

    const onClickHandler = (x, y) => {
        if (win || death) return;

        if (mask[y * size + x] === Mask.Transparent) return;

        const clearing = [];

        function clear(x, y) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                if (mask[y * size + x] === Mask.Transparent) return;

                clearing.push([x, y]);
            }
        }

        clear(x, y);

        while (clearing.length) {
            const [x, y] = clearing.pop();

            mask[y * size + x] = Mask.Transparent;

            if (board[y * size + x] !== 0) continue;

            clear(x + 1, y);
            clear(x - 1, y);
            clear(x, y + 1);
            clear(x, y - 1);
        }
        setCount(count + 1)
        if (board[y * size + x] === Mine) {
            if (count == 0) {
                FixBoard(board, y * size + x, setBoard)
            } else {

                mask.forEach((_, i) => mask[i] = Mask.Transparent);
                setDeath(true);
                setCount(0)
                setExpBomb(y * size + x)
            }
        }

        setMask((prev) => [...prev]);
    }

    let contextHandler = (e,x,y) => {
        {
            e.preventDefault();
            e.stopPropagation();

            if (win || death) return;

            if (mask[y * size + x] === Mask.Transparent) return;

            if (mask[y * size + x] === Mask.Fill) {
                mask[y * size + x] = Mask.Flag;
            } else if (mask[y * size + x] === Mask.Flag) {
                mask[y * size + x] = Mask.Question;
            } else if (mask[y * size + x] === Mask.Question) {
                mask[y * size + x] = Mask.Fill;
            }

            setMask((prev) => [...prev]);
        }
    }

    return (
        <section className='sapper'>
            <div className='sapper__game'>
                <div className='sapper__header header'>
                    <div className='header__min time'>
                        {getTime(minutes)}
                    </div>
                    <div className='header__ico'>
                        {
                            death ? <img src={lossIco} alt=""/> :
                                win ?
                                    <img src={winIco} alt=""/>
                                    :
                                    <img src={initIco} alt=""/>
                        }
                    </div>
                    <div className='header__sec time'>
                        {getTime(seconds)}
                    </div>
                </div>
                <div>
                    {dimension.map((_, y) => {
                        return (
                            <div key={y} style={{display: 'flex'}}>
                                {dimension.map((_, x) => {
                                    return (
                                        <div
                                            key={x}
                                            className='ico'
                                            onClick={() => onClickHandler(x, y)}
                                            onContextMenu={(e) => contextHandler(e,x,y)}
                                        >
                                            {viewBlocks(mask[y * size + x], board[y * size + x], y * size + x)}
                                        </div>);
                                })}
                            </div>);
                    })}
                </div>

            </div>
        </section>
    )
}