import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DelayedContent from './Loading';

describe('<Loading />', () => {
  test('it should mount', () => {
    render(<DelayedContent children={undefined} />);
    
    const loading = screen.getByTestId('Loading');

    expect(loading).toBeInTheDocument();
  });
});