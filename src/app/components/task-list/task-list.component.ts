import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  modalOpen: boolean = false;
  addModalOpen: boolean = false;
  taskFormGroup!: FormGroup;
  activeTask: any;
  sortOrder: "recent" | "oldest" = "recent";
  private searchSubject: Subject<string> = new Subject<string>();
  
  row: number = -1;

  col: number = -1;

  taskList: { title: string, tasks: { id: string, title: string, description: string, createdAt: string }[] }[] = [
    {
      title: 'To do',
      tasks: []
    },
    {
      title: 'In Progress',
      tasks: []
    },
    {
      title: 'Done',
      tasks: []
    }

  ]
  constructor(private fb: FormBuilder, private commonService: CommonService,private alertService : AlertService) { };

  ngOnInit(): void {
    this.taskFormGroup = this.fb.group({
      title: [, Validators.required],
      description: [, Validators.required]
    });
    this.fetchTask();

    this.searchSubject.pipe(
      debounceTime(300), // Adjust the debounce time as needed
      switchMap(value => this.commonService.fetchTask(this.sortOrder, value))
    ).subscribe({
      next: (response: any) => {
        this.groupByStatus(response.tasks || []);
      },
      error: (err: any) => {
        this.alertService.show(err.error.message || "Error in finding the tasks");
      }
    });

  }
  get f() { return this.taskFormGroup.controls; }

  drop(event: CdkDragDrop<any>): void {

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }
  private fetchTask() {
    this.commonService.fetchTask(this.sortOrder).subscribe({
      next: (response: any) => {
        // console.log();
        this.groupByStatus(response.tasks || []);
      }, error: (err: any) => {

      }
    })
  }
  private groupByStatus(tasks: any[]) {
    this.taskList = [
      {
        title: 'To do',
        tasks: []
      },
      {
        title: 'In Progress',
        tasks: []
      },
      {
        title: 'Done',
        tasks: []
      }
  
    ];
    tasks.forEach(task => {
      const { status } = task;
      switch (status) {
        case "To do":
          this.taskList[0].tasks.push(task);
          break;
        case "In Progress":
          this.taskList[1].tasks.push(task);
          break;
        case "Done":
          this.taskList[2].tasks.push(task);
          break;
      }
    })
  }

  saveTaskDetails() {

    if (this.taskFormGroup.invalid) {
      this.alertService.show("Fill all the Mandatory details");
      return;
    }

    if (this.activeTask) {
      const { _id } = this.activeTask;
      const { title, description } = this.taskFormGroup.value;

      this.updateValue(_id, { title, description }, this.row, this.col);
      return;
    }
    const { title, description } = this.taskFormGroup.value;

    const payload = {
      title,
      description
    }
    this.commonService.createTask(payload).subscribe({
      next: (response: any) => {
        this.addModalOpen = false;
        this.taskFormGroup.reset();
        this.alertService.show(response.message || "Task Created");
      }, error: (err: any) => {
        this.alertService.show(err.error.message || "Something went wrong");
      }
    })
  }

  onEdit(x: any, i: number, j: number) {
    this.activeTask = x;
    this.addModalOpen = true;
    this.taskFormGroup.patchValue(x);
    this.row = i;
    this.col = j;
  }

  private updateValue(id: string, payload: any, i: number, j: number) {
    this.commonService.updateTask(id, payload).subscribe({
      next: (respose: any) => {
        if (i > -1 && j > -1) this.taskList[i].tasks[j] = respose;

        this.addModalOpen = false;
        this.activeTask = null;
        this.taskFormGroup.reset();
        this.row = -1;
        this.col = -1;
      }, error: (err: any) => {
        this.alertService.show(err.error?.message || "Some thing went wrong");
      }
    })
  }

  onDelete(x: any, i: number, j: number) {
    this.commonService.deleteTask(x._id).subscribe({
      next: (response: any) => {
        this.taskList[i].tasks.splice(j, 1);
        this.alertService.show("Delete SuccessFully");
      }, error: (err: any) => {
        this.alertService.show(err.error?.message || "Some thing went wrong");
      }
    })
  }

  onSearch($event: any) {

    // const flag = $event.target && $event.target.value.length > 3;
    // if (flag) {
    //   const value = $event.target.value;
    //   this.commonService.fetchTask(this.sortOrder, value).subscribe({
    //     next: (response: any) => {
    //       // console.log();
    //       this.groupByStatus(response.tasks || []);
    //     }, error: (err: any) => {
    //       alert("Error is finding the tasks");
    //     }
    //   })
    // }else if($event.target && $event.target.value.length === 0){
    //   this.fetchTask();
    // }
    const value = $event.target?.value;
    if (value.length > 3) {
      this.searchSubject.next(value);
    } else if (value.length === 0) {
      this.fetchTask();
    }
  }

  changeOrder($event: any) {
    if (!$event) return;
    const value = $event.target.value;
    this.sortOrder = value;

    this.fetchTask()
  }
}
