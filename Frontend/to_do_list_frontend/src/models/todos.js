export default class ToDos {
    constructor(
        toDoListId,
        toDoList,
        listMarked,
    ) {
        this.toDoListId = toDoListId;
        this.toDoList = toDoList;
        this.listMarked = listMarked;
    }
     getTitle(){
        return this.toDoList;

    }
}
