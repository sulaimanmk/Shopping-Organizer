

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"  //firebase function
import {getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-4cd58-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings) //
const database = getDatabase(app) // links four database to firebase function

const shoppingListInDB = ref(database, "shoppingList") //ref function takes the database and the name of item to be stored in it

const addBtn = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")
const ul = document.getElementById("ul-el")

addBtn.addEventListener("click", function() {
    
    let inputValue = inputField.value; 

    push(shoppingListInDB,inputValue)
    console.log(inputValue)

    //appendItemToList(inputValue)
    clearInput()
    
    
    // let list = ""
    // list += `<li>${inputValue}</li>`
    // ul.innerHTML = list
})

onValue(shoppingListInDB, function(snapshot) {
   
   
   if(snapshot.exists()) {
        let arrayedItems =  Object.entries(snapshot.val())
        clearUl()
        for(let i=0; i<arrayedItems.length; i++){
            let currentItem = arrayedItems[i];
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToList(currentItem)
        }
    }
    else{
        ul.innerHTML = `Start Typing.....`
        return ul
   }
   
})

function clearInput() {
    inputField.value = ""
}

function appendItemToList(item) {

    let itemID = item[0]
    let itemValue = item[1]
    // ul.innerHTML += `<li>${itemValue}</li>`
    const li = document.createElement("li")
    li.textContent = itemValue;
    ul.append(li)
    li.addEventListener("dblclick", function() {
        console.log(itemID)
        let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfStoryInDB)
    })
}

function clearUl() {
    ul.innerHTML = ""
}