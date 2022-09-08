import RingSvg from "../components/RingSvg";
import React, { useEffect } from "react";

const Timer = (props) => {
    /** It would be better to move count and setCount into this component
      * There are 2 reasons
      * 
      * A - Simplicity
      * This is because in order to keep things simple you want to avoid sharing
      * logic, states and variables between components unless you have to. 
      * It is much easier to fix bugs and reason about the application when each component 
      * is self contained, the number of potential connections increases exponentially 
      * when each component is talking every other one
      * 
      * B - unnecessary renders
      * Setting the state in the parent causes unnecessary re-renders in the parent component
      * every 100ms when setCount is called, this can slow down the application
     */

    const {
        questionDuration,
        questionNumber,
        totalNumberOfQuestions,
        count,
        setCount,
    } = props;

    /** Whenever you have constants it is standard practice to declare them outside of the component
     * and use all caps in the variable name e.g
     * const MULTIPLIER = 10
     */
    const multiplier = 10;
    const timeLimit = questionDuration * multiplier;

    useEffect(() => {
        setCount(0);
        let counter;
        const countDownTimer = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount < timeLimit - 1) {
                    return currentCount + 1;
                } else {
                    if (questionNumber <= totalNumberOfQuestions) {
                        //runs when countdown runs to 0

                        //if statement used because code within setCount runs twice for every
                        //interval however the addpoints function should only run once per interval
                        if (counter) {
                            props.addPoints();
                        }

                        counter = currentCount;
                    }

                    clearInterval(countDownTimer);

                    return currentCount + 1;
                }
            });
        }, 100); // create a constant for the 100ms

        return () => {
            clearInterval(countDownTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const remainingTime = timeLimit - count;

    return (
        <div className="timer-svg-container">
            <RingSvg count={remainingTime} timeLimit={timeLimit} />
            <div className="timer">{(remainingTime / 10).toFixed(0)}</div>
        </div>
    );
};

export default Timer;
