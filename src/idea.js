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
    if (!retrievedIdeas) {
      retrievedIdeas = [];
      retrievedIdeas.push(this);
    } else {
      for (var i = 0; i < retrievedIdeas.length; i++) {
        if (retrievedIdeas[i].id === this.id) {
          retrievedIdeas[i] = this;
        }
      }
    }
    localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
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
    this.star = !this.star;
    //if we want to update title and body, include parameters and reassign in method
  }
}
