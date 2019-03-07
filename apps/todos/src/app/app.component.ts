import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  title: string;
}

@Component({
  selector: 'nx-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/todos').subscribe(t => (this.todos = t));
  }

  addTodo() {
    this.http.post('/api/todos', {}).subscribe(() => this.fetch());
  }
}
