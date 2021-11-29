import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('renders content but not likes or url', () => {
  const blog = {
    title: 'Jorman seikkailut',
    Author: 'Jorma Jokitalo',
    url: 'jorma.com',
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('Jorman seikkailut');

  const div = component.container.querySelector('.togglableContent');
  expect(div).toHaveStyle('display: none');

  //   const div = component.container.querySelector('div');
  //   console.log(prettyDOM(div));
});

test('url and likes are displayed after pressing view', async () => {
  const blog = {
    title: 'Jorman seikkailut',
    Author: 'Jorma Jokitalo',
    url: 'jorma.com',
    likes: '5',
  };

  //   const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('like');
  const div = component.container.querySelector('.togglableContent');
  expect(div).not.toHaveStyle('display: none');
  expect(div).toHaveStyle('display: block');
});

test('like is pressed twice, handler is called twice', () => {
  const blog = {
    title: 'Jorman seikkailut',
    Author: 'Jorma Jokitalo',
    url: 'jorma.com',
    likes: '5',
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} handleLikes={mockHandler} />);
  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  component.debug();

  expect(mockHandler.mock.calls).toHaveLength(2);
});
