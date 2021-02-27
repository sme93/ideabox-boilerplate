class Idea  {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
    this.comments = [];
  }
  saveToStorage() {
    ideas.push(newIdea);
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }
  deleteFromStorage() {

  }
  updateIdea() {

  }
}
