class Comment {
    constructor(ideaId, content) {
        this.ideaId = ideaId;
        this.content = content;
    }

    saveToStorage() {
        console.log("save to storage");
    }
    
    deleteFromStorage() {
        console.log("delete from storage");
    }
}


