import { renderGraphics } from "./renderGraphs.js";

// Checks if last session data exists
const loadLastSession = () => {
    if(localStorage.getItem("sessionData") !== null){
        const data = JSON.parse(localStorage.getItem("sessionData"));
        console.log("Last session data found and loaded");
        console.log(data)
        renderGraphics(data);
    }else{
        console.log("Last session data not found, starting with blank graphic");
        const data = {
            valorFaturamento: 0,
            custoFixo: 0,
            custoVariavel: 0,
        }
        renderGraphics(data);
    }
    return false;
}

loadLastSession();

// Saves current session data
const saveSessionData = () => {
    // Object to storage all the data from the current session
    const sessionData = {
        valorFaturamento: Number(document.getElementById("faturamento").value),
        custoFixo: Number(document.getElementById("custoFixo").value),
        custoVariavel: Number(document.getElementById("custoVariavel").value)
    }
    renderGraphics(sessionData);
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    console.log("Last session data saved");
    console.log(sessionData);
}

document.getElementById("submitButton").addEventListener("click", saveSessionData);