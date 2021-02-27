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

  }
  updateIdea() {

  }
}
