import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UiModule } from '@nx-playground/ui';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClientTestingBackend } from '@angular/common/http/testing/src/backend';
import { Todo } from '@nx-playground/data';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testData: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  function checkInitCall() {
    const req = httpTestingController.expectOne('/api/todos');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, HttpClientTestingModule],
      declarations: [AppComponent]
    }).compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    checkInitCall();
  });

  it(`should have as title 'todos'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.todos).toEqual(testData);
    checkInitCall();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Todos');
    checkInitCall();
  });

  it('#addTodo() should send a POST request to the backend', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.todos.length).toEqual(2);
    checkInitCall();

    app.addTodo();

    const postRequest = httpTestingController.expectOne('/api/todos');
    expect(postRequest.request.method).toEqual('POST');
    postRequest.flush({ title: 'Todo 3' });

    const getRequest = httpTestingController.expectOne('/api/todos');
    expect(getRequest.request.method).toEqual('GET');
    getRequest.flush([...testData, { title: 'Todo 3' }]);
    httpTestingController.verify();

    expect(app.todos.length).toEqual(3);
  });

  it('should render a button which triggers #addTodo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app: AppComponent = fixture.debugElement.componentInstance;
    const compiled: HTMLDivElement = fixture.debugElement.nativeElement;
    expect(app.todos.length).toEqual(2);
    checkInitCall();

    const addTodoSpy = jest.spyOn(app, 'addTodo').mockReturnValueOnce();
    compiled.querySelector('button').click();
    expect(addTodoSpy).toHaveBeenCalled();
  });
});
