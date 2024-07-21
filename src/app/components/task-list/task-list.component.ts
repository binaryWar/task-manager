import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  modalOpen : boolean = false;
  
  taskList = [
    {
      title : 'Todo',
      tasks : [
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        }
      ]   
  
    },
    {
      title : 'Inprogress',
      tasks : [
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        }
      ]   
  
    },
    {
      title : 'Done',
      tasks : [
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        },
        {
          name : "task3",
          description : "i am the good boy and you should create",
          createdAt : "01/01/10984 04:50 AM"
        }
      ]   
  
    }

  ]

  drop(event : CdkDragDrop<any>) : void{
    
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  onClose(){
    this.modalOpen = false;
  }

  onSave(){
    this.onClose();
  }

  onCancel(){
    this.onClose()
  }
}
