class Idea  {
  constructor(title, body, star, id, comments = []) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.star = star;
    this.comments = comments;
  }
  saveToStorage(idea) {
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
    if (!retrievedIdeas) {
      retrievedIdeas = [];
    }
    retrievedIdeas.push(idea);
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
    var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
    if (!retrievedIdeas) {
      return;
    }
    for (var i = 0; i < retrievedIdeas.length; i++) {
      if (this.id === retrievedIdeas[i].id) {
        this.star = !this.star;
        retrievedIdeas[i].star = this.star;
        // set the value of this.star to the opposite of the value of this.star
      }
    }
    localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
  }
  storeComment(comment) {
    this.comments.push(comment);
    comment.saveToStorage(comment);
  }
}
