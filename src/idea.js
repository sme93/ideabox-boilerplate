class Idea  {
  constructor(title, body, star, id) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.star = star;
    this.comments = [];
  }
  saveToStorage() {
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
    if (retrievedIdeas.length) {
      for (var i = 0; i < retrievedIdeas.length; i++) {
        //if retrievedIdeas contains any ideas and the card id already exists, update the card and then update storage
        if (retrievedIdeas[i].id === this.id) {
          retrievedIdeas[i] = this;
          localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
          return
        }
      }
      //if retrievedIdeas contains any ideas and  the card id does not exist, push the card to the array of idea cards
      retrievedIdeas.push(this);
    } else {
      //if retrievedIdeas is empty, push the idea card into the array
      retrievedIdeas.push(this);
    }
      localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
  }

  deleteFromStorage() {
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
    //if retrievedIdeas is empty, exit the method
    if (!retrievedIdeas) {
      return;
    } else {
      for (var i = 0; i < retrievedIdeas.length; i++) {
        //delete the targeted card from the array and update local storage
        if (retrievedIdeas[i].id === this.id) {
          retrievedIdeas.splice(i, 1);
          localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
        }
      }
    }
  }

  updateIdea() {
    this.star = !this.star;
    //if we want to update title and body, include parameters and reassign in method
  }
}
