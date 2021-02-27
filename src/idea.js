class Idea  {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
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
