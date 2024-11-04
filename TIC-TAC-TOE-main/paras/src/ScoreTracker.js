import React,{useState} from "react";

const useScoreTracker = ()=>{
    const [score,setScore]=useState(0);
    const [highScore,setHighScore]=useState(0);
    const increaseScore=()=>{
        const newScore = score+1;
        setScore(newScore);
        if(newScore>highScore){
            setHighScore(newScore);
        }
    };

    const resetScore =()=>{
        setScore(0);
    };

    return {score,highScore,increaseScore,resetScore};
};

export default useScoreTracker;
