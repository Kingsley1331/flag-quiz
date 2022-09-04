import RingSvg from "../components/RingSvg";
import React, { useEffect } from "react";

const Timer = (props) => {
    const {
        questionDuration,
        questionNumber,
        totalNumberOfQuestions,
        count,
        setCount,
    } = props;

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
        }, 100);

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
