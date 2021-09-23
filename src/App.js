//began on 04/10/2020
import React, {
    useState,
    useEffect,
    useReducer,
    useRef,
    useCallback,
} from "react";

import Names from "./names";
import Flags from "./flags";
import "./App.scss";

import {
    highlightSelection,
    arrayOfSelectedCountries,
    pairings,
    totalStateResetter,
} from "./utility";

const Timer = (props) => {
    const timeLimit = 30;
    const [count, setCount] = useState(0);

    useEffect(() => {
        const countDownTimer = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount < timeLimit - 1) {
                    return currentCount + 1;
                } else {
                    if (props.questionNumber < 10) {
                        // setTimeout(props.addPoints, 3000);
                        props.addPoints();
                    }

                    clearInterval(countDownTimer);

                    return currentCount + 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(countDownTimer);
        };
    }, []);

    return <div>Timer:{timeLimit - count}</div>;
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
        return { name: country.name, flag: country.flags[0] };
    });

    return filteredData;
}

const App = () => {
    const [selections, dispatch] = useReducer(reducer, {
        names: {
            0: { country: "", status: "unselected" },
            1: { country: "", status: "unselected" },
            2: { country: "", status: "unselected" },
            3: { country: "", status: "unselected" },
            4: { country: "", status: "unselected" },
        },
        flags: {
            0: { country: "", status: "unselected" },
            1: { country: "", status: "unselected" },
            2: { country: "", status: "unselected" },
            3: { country: "", status: "unselected" },
            4: { country: "", status: "unselected" },
        },
    });

    const [countriesFromApi, setCountries] = useState([{ name: "", flag: "" }]);

    const [questionNumber, setQuestionNumber] = useState(1);
    const [totalPoints, setTotalPoints] = useState(0);

    const [index, setIndex] = useState(0);
    const updateIndex = useCallback(() => setIndex(index + 1), [index]);

    // let [timer, setTimer] = useState(0);
    // let [countDown, setCountDown] = useState(30);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://restcountries.com/v2/all");
            const data = await response.json();

            let randomlySelectedCountries = arrayOfSelectedCountries(data);

            setCountries(nameFlagData(randomlySelectedCountries));

            updateIndex();
        }
        fetchData();
    }, [questionNumber]);

    const containerRef = useRef();
    useEffect(() => {
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
    }, [selections]);

    // console.log("countries", selections.names);
    // console.log("flags", selections.flags);

    const addPoints = () => {
        let points = 0;

        pairings.forEach((pair) => {
            if (pair.flag === pair.name.name) {
                points++;
            }
            return points;
        });

        setTotalPoints(points);

        totalStateResetter(countriesFromApi, dispatch, "choose-name", "name");
        totalStateResetter(countriesFromApi, dispatch, "choose-flag", "flag");

        if (questionNumber < 10) {
            setQuestionNumber(questionNumber + 1);
        }

        // if (loadQuiz) {
        // updateIndex();

        // setLoadQuiz(false);
        // }
    };

    return (
        <>
            <h1 className="App-header">Flag Quiz</h1>
            <div ref={containerRef} className="main-container">
                <div className="country-name-container">
                    <Names
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                    />
                </div>
                <div className="flag-container">
                    <Flags
                        dispatch={dispatch}
                        countryInfo={countriesFromApi}
                        gameState={selections}
                    />
                </div>
                <button type="submit" onClick={addPoints}>
                    Submit answers
                </button>
            </div>
            <p>{questionNumber}</p>

            <p>Total point:{totalPoints} </p>
            <Timer
                key={index}
                addPoints={addPoints}
                questionNumber={questionNumber}
            />
        </>
    );
};

export default App;

/*
- split some of the functionality currently in the addPoints function i.e a next question button
 that is separate from the rest of the functionalities.

 -should next question automatically render or should the use click next button first?

 - change order of names or flags
 */
