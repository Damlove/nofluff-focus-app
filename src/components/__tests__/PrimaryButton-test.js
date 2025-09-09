import React from 'react';
import renderer from 'react-test-renderer';
import { PrimaryButton } from '../ui/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(
      <PrimaryButton title="Test Button" onPress={() => {}} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with secondary variant', () => {
    const tree = renderer.create(
      <PrimaryButton 
        title="Secondary Button" 
        onPress={() => {}} 
        variant="secondary" 
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const tree = renderer.create(
      <PrimaryButton 
        title="Disabled Button" 
        onPress={() => {}} 
        disabled={true} 
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    const tree = renderer.create(
      <PrimaryButton 
        title="Loading Button" 
        onPress={() => {}} 
        loading={true} 
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with large size', () => {
    const tree = renderer.create(
      <PrimaryButton 
        title="Large Button" 
        onPress={() => {}} 
        size="large" 
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
