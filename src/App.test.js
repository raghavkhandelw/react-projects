import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders todo input fields and add button', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/What's the task title?/i);
  const descInput = screen.getByPlaceholderText(/What's the task description/i);
  const addButton = screen.getByText(/Add/i);

  expect(titleInput).toBeInTheDocument();
  expect(descInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('can add a task', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/What's the task title?/i);
  const descInput = screen.getByPlaceholderText(/What's the task description/i);
  const addButton = screen.getByText(/Add/i);

  fireEvent.change(titleInput, { target: { value: 'New Task' } });
  fireEvent.change(descInput, { target: { value: 'Task Description' } });
  fireEvent.click(addButton);

  const taskTitle = screen.getByText(/New Task/i);
  expect(taskTitle).toBeInTheDocument();
});

test('can toggle task completion', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/What's the task title?/i);
  const descInput = screen.getByPlaceholderText(/What's the task description/i);
  const addButton = screen.getByText(/Add/i);

  fireEvent.change(titleInput, { target: { value: 'New Task' } });
  fireEvent.change(descInput, { target: { value: 'Task Description' } });
  fireEvent.click(addButton);

  const taskTitle = screen.getByText(/New Task/i);
  fireEvent.click(taskTitle);

  expect(taskTitle).toHaveClass('completed');
});
