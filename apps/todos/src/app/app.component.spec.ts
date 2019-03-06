import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todos'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.todos).toEqual([{ title: 'Todo 1' }, { title: 'Todo 2' }]);
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Todos');
  });

  it('#addTodo() should add a todo item to #todos', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.todos.length).toEqual(2);
    app.addTodo();
    expect(app.todos.length).toEqual(3);
  });

  it('should render a button which triggers #addTodo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app: AppComponent = fixture.debugElement.componentInstance;
    const compiled: HTMLDivElement = fixture.debugElement.nativeElement;

    expect(app.todos.length).toEqual(2);

    compiled.querySelector('button').click();
    expect(app.todos.length).toEqual(3);
  });
});
