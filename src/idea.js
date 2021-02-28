class Idea  {
  constructor(title, body, star, id) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.star = star;
    this.comments = [];
  }
  saveToStorage() {
    ideas.push(newIdea);
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }
  deleteFromStorage() {
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
    if (!retrievedIdeas) {
      return;
    } 

    for (var i = 0; i < retrievedIdeas.length; i++) {
      if (this.id === retrievedIdeas[i].id) {
        retrievedIdeas.splice(i, 1);
      }
    }
    localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
  }
  
  updateIdea() {

  }
}
