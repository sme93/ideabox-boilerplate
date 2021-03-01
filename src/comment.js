class Comment {
    constructor(ideaId, content) {
        this.ideaId = ideaId;
        this.content = content;
    }

    saveToStorage() {
      var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
      if (!retrievedIdeas) {
        return;
      }
      for (var i = 0; i < retrievedIdeas.length; i++) {
        if (this.id === retrievedIdeas[i].id) {
            retrievedIdeas[i].comments.push(newComment.content);
        }
      }
      localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
    }

    deleteFromStorage() {
        console.log("delete from storage");
    }
}
