import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  modalOpen : boolean = false;
  addModalOpen : boolean = false;
  taskFormGroup!:FormGroup;
  activeTask:any;

  taskList : {title:string, tasks: {id:string,title:string,description:string,createdAt:string}[]}[]= [
    {
      title : 'To do',
      tasks : []   
    },
    {
      title : 'In Progress',
      tasks : []   
    },
    {
      title : 'Done',
      tasks : []
    }

  ]
  constructor(private fb : FormBuilder,private commonService : CommonService){};

  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
      title : [,Validators.required],
      description : [,Validators.required]
    });
    this.fetchTask();
  }
  get f() { return this.taskFormGroup.controls; }

  drop(event : CdkDragDrop<any>) : void{
    
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }
  private fetchTask(){
    this.commonService.fetchTask().subscribe({
      next : (response:any)=>{
        // console.log();
        this.groupByStatus(response.tasks || []);
      },error : (err:any)=>{

      }
    })
  }
  private groupByStatus(tasks:any[]){
    tasks.forEach(task=>{
      const {status} = task;
      switch(status){
        case "To do" :
          this.taskList[0].tasks.push(task);
          break;
        case "In Progress" :
          this.taskList[1].tasks.push(task);
          break;
        case "Done" :
          this.taskList[2].tasks.push(task);
          break; 
      }
    })
  }

  saveTaskDetails(){
    
    if(this.taskFormGroup.invalid){
      alert("Fill all the Mandatory details");
      return;
    }

    if(this.activeTask){
      const {_id} = this.activeTask;
      const {title,description} = this.taskFormGroup.value;
       
      this.updateValue(_id,{title,description});
      return;
    }
    const {title,description} = this.taskFormGroup.value;

    const payload = {
      title,
      description
    }
    this.commonService.createTask(payload).subscribe({
      next : (response:any)=>{
        alert(response.message || "Task Created");
      },error : (err:any)=>{
        alert(err.message || "Something went wrong");
      }
    })
  }

  onEdit(x:any){
    this.activeTask = x;
    this.addModalOpen = true;
    this.taskFormGroup.patchValue(x);
  }
  private updateValue(id:string,payload:any){
    this.commonService.updateTask(id,payload).subscribe({
      next :(respose:any)=>{
        this.addModalOpen = false;
        this.activeTask = null;
        this.taskFormGroup.reset();
      },error: (err:any)=>{
        alert("Some thing went wrong");
      } 
    })
  }
}
