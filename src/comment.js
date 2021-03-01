class Comment {
    constructor(ideaId, content) {
        this.ideaId = ideaId;
        this.content = content;
    }

    saveToStorage() {
        // for (var i = 0; i < ideas.length; i++) {
        //       console.log("ideas index", ideas[i]);
        //   if (parseInt(ideaId) === ideas.indexOf(ideas[i])) {
        //     ideas[i].comments.push(newComment.content);
        //   }
        // }
    }

    deleteFromStorage() {
        console.log("delete from storage");
    }
}
