import React, {
    useState,
    useEffect,
    useReducer,
    useRef,
    useCallback
} from "react";

import { useParams, useNavigate } from "react-router-dom"

import Names from "../names";
import Flags from "../flags";

import {
    highlightSelection,
    arrayOfSelectedCountries,
    pairings,
    totalStateResetter,
    arrayScrambler,
    createInitialObject,
    arrayScramblerInput
} from "../utility";

import RingSvg from "../RingSvg";

const totalNumberOfQuestions = 3;

//maybe move this to another file
const Timer = (props) => {

    const { questionDuration, questionNumber } = props

    const multiplier = 10
    const timeLimit = questionDuration * multiplier;
    const [count, setCount] = useState(0);
    // const [pauseTimer, setPauseTimer] = useState(false);

    useEffect(() => {
        let n;
        const countDownTimer = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount < timeLimit - 1) {
                    return currentCount + 1;
                } else {
                    if (questionNumber <= totalNumberOfQuestions) {
                        //runs when countdown runs to 0

                        //if statement used because code within setCount runs twice for every
                        //interval however the addpoints function should only run once per interval
                        if (n) {
                            props.addPoints();
                        }

                        n = currentCount;
                    }

                    clearInterval(countDownTimer);

                    return currentCount + 1;
                }
            });
        }, 100);

        // setPauseTimer(props.pause);
        // if (pauseTimer) {
        //     clearInterval(countDownTimer);
        // }

        return () => {
            clearInterval(countDownTimer);
        };
    }, []);

    const remainingTime = (timeLimit - count)

    return (
        <div className='svgContainer'>
            <RingSvg count={remainingTime} timeLimit={timeLimit} />
            <div className="timer">{(remainingTime / 10).toFixed(0)}</div>
        </div>
    )
};

function reducer(state, action) {
    const index = action.flag ? action.flag.index : action.name.index;

    switch (action.type) {
        case "choose-flag":
            return {
                ...state,
                flags: {
                    ...state.flags,
                    [index]: {
                        country: action.flag[index].country,
                        status: action.flag[index].status,
                    },
                },
            };

        case "choose-name":
            return {
                ...state,
                names: {
                    ...state.names,
                    [index]: {
                        country: action.name[index].country,
                        status: action.name[index].status,
                    },
                },
            };
        default:
            return state;
    }
}

function nameFlagData(countryData) {
    const filteredData = countryData.map((country) => {
        return { name: country.name.common, flag: country.flags[0] };
    });

    return filteredData;
}



function Game() {
    const { difficulty } = useParams()
    let numberOfSelectedCountries
    let questionDuration

    if (difficulty === "easy") {
        numberOfSelectedCountries = 5;
        questionDuration = 30;
    } else if (difficulty === "medium") {
        numberOfSelectedCountries = 6;
        questionDuration = 25;
    } else {
        questionDuration = 20;
        numberOfSelectedCountries = 7
    }


    const initialStateObject = createInitialObject(numberOfSelectedCountries)

    const [selections, dispatch] = useReducer(reducer, {
        names: initialStateObject,
        flags: initialStateObject
    });





    const [countriesFromApi, setCountries] = useState([{ name: "", flag: "" }]);

    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalPoints, setTotalPoints] = useState(0);

    const [index, setIndex] = useState(0);
    const updateIndex = useCallback(() => setIndex(index + 1), [index]);

    const [pause, setPause] = useState(false);

    const navigate = useNavigate()

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const [flagOrder, setFlagOrder] = useState(arrayScrambler(arrayScramblerInput(numberOfSelectedCountries)));

    const [freezeCountries, setFreezeCountries] = useState(false);

    const [canSubmitPoints, setCanSubmitPoints] = useState(true);


     const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://restcountries.com/v3/all");
            const data = await response.json();
            console.log(data);
            setLoading(false);
            let randomlySelectedCountries = arrayOfSelectedCountries(data, numberOfSelectedCountries);

            setCountries(nameFlagData(randomlySelectedCountries));

            updateIndex();
        }
        fetchData();
    }, [questionNumber]);

    const containerRef = useRef();
    useEffect(() => {
        if (!loading) {
            highlightSelection(
                containerRef,
                selections,
                "flags",
                "flag-div",
                "paired"
            );
            highlightSelection(
                containerRef,
                selections,
                "names",
                "country",
                "hide"
            );
        }
    }, [selections]);

    // console.log("countries", selections.names);
    // console.log("flags", selections.flags);

    const addPoints = () => {
        if (canSubmitPoints) {
            let points = 0;
            // console.log(pairings);
            pairings.forEach((pair) => {
                if (pair.flag === pair.name.name) {
                    points++;
                }
                // return points;
            });

            setPause(true);
            setFreezeCountries(true);

            /** this line is responsible for the error(Cannot update a component (`App`) while rendering a different component (`Timer`))
             *  needs to be fixed later ********/


            setTotalPoints((total) => {
                const cumalativePoints = total = total + points;
                localStorage[`${difficulty}TotalPoints`] = cumalativePoints;
                return cumalativePoints;
            });

            /****************************************************************************/
            setCanSubmitPoints(false);
            if (questionNumber === totalNumberOfQuestions) {
                setTimeout(() => {
                    navigate(`/results/${difficulty}`);
                    pairings.length = 0;
                }, 2000)
            }
        }
    };

    const moveToNextQuestion = () => {
        setCanSubmitPoints(true);
        pairings.length = 0;
        setPause(false);
        setFreezeCountries(false);
        totalStateResetter(countriesFromApi, dispatch, "choose-name", "name");
        totalStateResetter(countriesFromApi, dispatch, "choose-flag", "flag");

        if (questionNumber < totalNumberOfQuestions) {
            setQuestionNumber(questionNumber + 1);
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        setFlagOrder(arrayScrambler(arrayScramblerInput(numberOfSelectedCountries)));

        setLoading(true);
    };


    if (loading) {
        return <p>loading</p>
    }

    return (
        <div className="quiz-container">
            <h1 className="App-header">Flag Quiz</h1>
            Level is {difficulty}
            <div ref={containerRef} className="main-container">
                <div className="country-name-container">
                    <Names
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                        freezeCountries={freezeCountries}
                    />
                </div>

                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                        flagOrder={flagOrder}
                        freezeCountries={freezeCountries}
                    />
                </div>
                {canSubmitPoints && (
                    <button
                        type="submit"
                        onClick={addPoints}
                        className="submit"
                    >
                        Submit answers
                    </button>
                )}
                {questionNumber < totalNumberOfQuestions && !canSubmitPoints && (
                    <button
                        className="next"
                        type="submit"
                        onClick={moveToNextQuestion}
                    >
                        Next question
                    </button>
                )}
            </div>
            <p className="question-number">{`Question - ${questionNumber}`}</p>

            <div className="total-points">Total points: {totalPoints} </div>

            {!pause && (
                <Timer
                    key={index}
                    addPoints={addPoints}
                    questionNumber={questionNumber}
                    questionDuration={questionDuration}
                />
            )}
        </div>
    )
}

export default Game