class Idea  {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
    this.comment = [];
  }
  saveToStorage() {
//saves to storage
//an array and/or local storage?
  }
  deleteFromStorage() {

  }
  updateIdea() {

  }
}
