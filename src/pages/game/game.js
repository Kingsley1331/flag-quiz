import React, {
    useState,
    useEffect,
    useReducer,
    useRef,
    useCallback,
} from "react";
import flags_background from "./../../assets/flags.jpg";

import { useParams } from "react-router-dom";

import Names from "../../components/names";
import Flags from "../../components/flags";
import Modal from "../../components/modal";
import Loader from "../../components/loader";
import Timer from "../../components/timer";

import {
    highlightSelection,
    arrayOfSelectedCountries,
    pairings,
    totalStateResetter,
    arrayScrambler,
    createInitialObject,
    arrayScramblerInput,
} from "../../utility";

import Results from "../results";
import HomePageModal from "../homePageModal";
import reducer from "./reducer";
import nameFlagData from "./gameUtility";

const totalNumberOfQuestions = 10;

function Game() {
    const { level } = useParams();
    let numberOfSelectedCountries;
    let questionDuration;

    if (level === "easy") {
        numberOfSelectedCountries = 5;
        questionDuration = 30;
    } else if (level === "medium") {
        numberOfSelectedCountries = 6;
        questionDuration = 25;
    } else {
        questionDuration = 20;
        numberOfSelectedCountries = 7;
    }

    const initialStateObject = createInitialObject(numberOfSelectedCountries);

    const [selections, dispatch] = useReducer(reducer, {
        names: initialStateObject,
        flags: initialStateObject,
    });

    const [countriesFromApi, setCountries] = useState([{ name: "", flag: "" }]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalPoints, setTotalPoints] = useState(0);
    const [index, setIndex] = useState(0);
    const updateIndex = useCallback(() => setIndex(index + 1), [index]);
    const [pause, setPause] = useState(false);
    const [count, setCount] = useState(0);

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    const [flagOrder, setFlagOrder] = useState(
        arrayScrambler(arrayScramblerInput(numberOfSelectedCountries))
    );

    const [freezeCountries, setFreezeCountries] = useState(false);
    const [canSubmitPoints, setCanSubmitPoints] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showHomePageModal, setHomePageShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://restcountries.com/v3/all");
            const data = await response.json();
            console.log(data);
            setLoading(false);
            let randomlySelectedCountries = arrayOfSelectedCountries(
                data,
                numberOfSelectedCountries
            );

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

    const addPoints = () => {
        if (canSubmitPoints) {
            let points = 0;

            pairings.forEach((pair) => {
                if (pair.flag === pair.name.name) {
                    points++;
                }
            });

            setPause(true);
            setFreezeCountries(true);

            /** this line is responsible for the error(Cannot update a component (`App`) while rendering a different component (`Timer`))
             *  needs to be fixed later ********/

            setTotalPoints((total) => {
                const cumalativePoints = (total = total + points);
                localStorage[`${level}TotalPoints`] = cumalativePoints;
                return cumalativePoints;
            });

            /****************************************************************************/
            setCanSubmitPoints(false);
            if (questionNumber === totalNumberOfQuestions) {
                setTimeout(() => {
                    setShowModal(true);
                    pairings.length = 0;
                }, 2000);
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
        setFlagOrder(
            arrayScrambler(arrayScramblerInput(numberOfSelectedCountries))
        );

        setLoading(true);
    };

    if (loading) {
        return <Loader />;
    }

    const changeLevel = () => {
        setHomePageShowModal(true);
    };

    return (
        <>
            <div className="quiz-container">
                <img
                    className="background"
                    src={flags_background}
                    alt="flags"
                />
                <div className="home-link">
                    <button onClick={changeLevel} className="">
                        Home
                    </button>
                </div>
                <h1 className="App-header">Flag Quiz</h1>
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
                    {questionNumber < totalNumberOfQuestions &&
                        !canSubmitPoints && (
                            <button
                                className="next"
                                type="submit"
                                onClick={moveToNextQuestion}
                            >
                                Next question
                            </button>
                        )}
                </div>
                <p className="question-number">{`Question - ${questionNumber} of ${totalNumberOfQuestions}`}</p>

                <div className="total-points">
                    <p>
                        Level is: <span className="level">{level} </span>
                    </p>
                    <p>Total points: {totalPoints} </p>
                </div>

                {showModal && (
                    <Modal>
                        <Results />
                    </Modal>
                )}

                {showHomePageModal && (
                    <Modal>
                        <HomePageModal
                            setHomePageShowModal={setHomePageShowModal}
                        />
                    </Modal>
                )}

                {!pause && (
                    <Timer
                        key={index}
                        addPoints={addPoints}
                        questionNumber={questionNumber}
                        questionDuration={questionDuration}
                        totalNumberOfQuestions={totalNumberOfQuestions}
                        count={count}
                        setCount={setCount}
                    />
                )}
            </div>
        </>
    );
}

export default Game;
