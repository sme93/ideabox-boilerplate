//****Global Variables ****
var newIdea;
var ideas = [];





// **** querySelectors ****
var saveButton = document.querySelector("#saveIdeaButton");
var title = document.querySelector("#titleInput");
var body = document.querySelector("#bodyInput");




//**** Event Listeners ****
saveButton.addEventListener("click", saveIdea);










//**** Functions **** 
function saveIdea() {
    event.preventDefault();
    newIdea = new Idea(title.value, body.value);
    ideas.push(newIdea);
}

function render() {

}
