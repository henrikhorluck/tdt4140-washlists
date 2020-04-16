import React from 'react';
import Index from '../pages/index'
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Index/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});