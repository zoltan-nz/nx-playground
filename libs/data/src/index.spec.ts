import { Todo } from './index';

describe('Todo Interface', () => {
  it('has a title property', () => {
    const todo: Todo = { title: 'some string' };
    expect(todo).toHaveProperty('title');
  });
});
