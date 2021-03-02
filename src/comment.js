class Comment {
    constructor(ideaId, content) {
        this.ideaId = ideaId;
        this.content = content;
    }
    
    saveToStorage(comment) {
      var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));
      for (var i = 0; i < retrievedIdeas.length; i++) {
        if (parseInt(this.ideaId) === retrievedIdeas[i].id) {
            retrievedIdeas[i].comments.push(comment);
        }
      }
      localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
    }

    deleteFromStorage() {
        
    }
}
