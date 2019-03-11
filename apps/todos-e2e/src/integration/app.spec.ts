import { getAddTodoButton, getTodos } from '../support/app.po';

describe('Todo App', () => {
  it('should display todos', async () => {
    cy.server();
    cy.route('GET', '/api/todos', [
      { title: 'Todo 1' },
      { title: 'Todo 2' }
    ]).as('getInitTodoList');

    cy.visit('/');
    cy.wait('@getInitTodoList');
    getTodos().should(t => expect(t.length).eq(2));

    cy.route('POST', '/api/todos', {});
    cy.route('GET', '/api/todos', [
      { title: 'Todo 1' },
      { title: 'Todo 2' },
      { title: 'Todo 3' }
    ]).as('getNewTodoList');

    getAddTodoButton().click();
    cy.wait('@getNewTodoList');
    getTodos().should(t => expect(t.length).equal(3));
  });
});
