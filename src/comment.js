class Comment {
    constructor(ideaId, content) {
        this.ideaId = ideaId;
        this.content = content;
    }

    saveToStorage() {
      var retrievedIdeas = JSON.parse(localStorage.getItem("ideas"));

      for (var i = 0; i < retrievedIdeas.length; i++) {
        if (parseInt(this.ideaId) === retrievedIdeas[i].id) {
            retrievedIdeas[i].comments.push(this.content);
        }
      }
      localStorage.setItem("ideas", JSON.stringify(retrievedIdeas));
    }

    deleteFromStorage() {
        console.log("delete from storage");
        //delete based on index in comments array
    }
}
