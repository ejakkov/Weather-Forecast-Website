import {readCSV} from './main.js';
import {parseCSV} from './main.js';

let availableKeyWords = [];
const data = parseCSV(await readCSV());

for(let i=0; i<data.length; i++){
    availableKeyWords.push(data[i].city);
}

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search-button");

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = availableKeyWords.filter((keyword)=> {
           return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    
    display(result);
}

searchButton.addEventListener("click", function() {
    let input = inputBox.value;
    if(input.length){
        let result = availableKeyWords.filter((keyword)=> {
           return keyword.toLowerCase().includes(input.toLowerCase());
        });
        if(result[0] != undefined){
            selectInput(result[0]);
            
        }
        inputBox.value = "";
    }

});


function display(result){
    const content = result.map((list)=>{
        return "<li>" + list + "</li>";
    })
    resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
    const listItems = resultBox.querySelectorAll("li");
    listItems.forEach((item) => {
        item.addEventListener("click", function() {
            selectInput(item.innerHTML);

        });
    });
}

function selectInput(selectedItem){
    inputBox.value = selectedItem;
    resultBox.innerHTML = "";
    
    const newPageURL = 'index2.html?city='  + encodeURIComponent(selectedItem);
    window.location.href = newPageURL;
}
