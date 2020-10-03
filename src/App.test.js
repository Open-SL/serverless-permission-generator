import React from 'react';
import { render, waitFor, getNodeText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('display the generated policy for the given project data', async () => {
    const { container } = render(<App />);

    userEvent.type(container.querySelector('input[name="projectName"]'), 'hacktoberfest');
    userEvent.type(container.querySelector('input[name="accountId"]'), '123457891234');
    userEvent.type(container.querySelector('input[name="region"]'), 'us-east-1');
    userEvent.type(container.querySelector('input[name="stage"]'), 'dev');
    userEvent.click(container.querySelector('button[type="button"]'));

    await waitFor(() => {
      expect(getNodeText(container.querySelector('.string-value'))).toEqual('"2012-10-17"');
    });
});

test('display error for invalid account ID', async () => {
    const { container, getByText } = render(<App />);

    userEvent.type(container.querySelector('input[name="projectName"]'), 'hacktoberfest');
    userEvent.type(container.querySelector('input[name="accountId"]'), 'boo');
    userEvent.type(container.querySelector('input[name="region"]'), 'us-east-1');
    userEvent.type(container.querySelector('input[name="stage"]'), 'dev');
    userEvent.click(container.querySelector('button[type="button"]'));

    await waitFor(() => {
      expect(getByText('Invalid ID')).toBeInTheDocument();
      expect(container.querySelector('.string-value')).not.toBeInTheDocument();
    });
});
