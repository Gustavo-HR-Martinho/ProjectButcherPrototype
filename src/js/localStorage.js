import { renderGraphics } from "./renderGraphs.js";

// Checks if last session data exists
const checkLastSession = () => {
    if(localStorage.getItem(sessionData) !== null){
        console.log("Last session data found");
        return true;
    }
    console.log("Last session data not found");
    return false;
}

// Loads and displays last session data
const getLastSession = () => {
    if(checkLastSession()){
        const data = JSON.parse(localStorage.getItem(sessionData));
        console.log("Last session data loaded");
        // Graphics values
    }
}

// Saves current session data
const saveSessionData = () => {
    // Object to storage all the data from the current session
    const sessionData =  {
        valorFaturamento: Number(document.getElementById("faturamento").value),
        custoFixo: Number(document.getElementById("custoFixo").value),
        custoOperacional: Number(document.getElementById("custoOperacional").value),
        custoVariavel: Number(document.getElementById("custoVariavel").value)
    }
    renderGraphics(sessionData);
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    console.log("Last session data saved");
    console.log(sessionData);
}

document.getElementById("submitButton").addEventListener("click", saveSessionData);