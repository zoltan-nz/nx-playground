import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '@nx-playground/data';

@Component({
  selector: 'nx-playground-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Input() todos: Todo[];

  constructor() {}

  ngOnInit() {}
}
