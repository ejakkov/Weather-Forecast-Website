import {readCSV} from './main.js';
import {parseCSV} from './main.js';

let availableKeyWords = [];
const data = parseCSV(await readCSV());

for(let i=0; i<data.length; i++){
    availableKeyWords.push(data[i].city);
}

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = availableKeyWords.filter((keyword)=> {
           return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    console.log(result);
}