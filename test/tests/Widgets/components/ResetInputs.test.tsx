import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ResetInputs } from '../../../../src/Widgets/FormStepContainerWidget/components/ResetInputsComponent';
import renderer from 'react-test-renderer';

const text = 'Reset';
const parentRef = {
  current: document.createElement('div'),
};
const setSelectedCallback = jest.fn();

describe('ResetInputs', () => {

  it('resets radio inputs when clicked', () => {
    const radioInput1 = document.createElement('input');
    radioInput1.type = 'radio';
    radioInput1.checked = true;
    const radioInput2 = document.createElement('input');
    radioInput2.type = 'radio';
    radioInput2.checked = true;

    parentRef.current.appendChild(radioInput1);
    parentRef.current.appendChild(radioInput2);

    const { getByText } = render(
      <ResetInputs
        parentRef={parentRef}
        setSelectedCallback={setSelectedCallback}
        text={text}
      />
    );

    fireEvent.click(getByText('Reset'));

    expect(setSelectedCallback).toHaveBeenCalledWith(false);
    expect(radioInput1.checked).toBe(false);
    expect(radioInput2.checked).toBe(false);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ResetInputs
          parentRef={parentRef}
          setSelectedCallback={setSelectedCallback}
          text={text}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
