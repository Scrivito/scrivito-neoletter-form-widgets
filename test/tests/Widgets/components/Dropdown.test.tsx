import React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from '../../../../src/Widgets/FormStepContainerWidget/components/SelectDropdownComponent';

describe('Dropdown', () => {
    it('renders the Dropdown component with options and empty dropdown', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const name = 'testDropdown';
        const id = 'testDropdownId';
        const required = true;

        const { container, getByText } = render(
            <Dropdown options={options} name={name} id={id} required={required} />
        );

        const emptyDropdown = container.querySelector('#empty-option');
        expect(emptyDropdown).toBeInTheDocument();

        options.forEach((option) => {
            const optionElement = getByText(option);
            expect(optionElement).toBeInTheDocument();
        });
    });
    it('renders correctly', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const name = 'testDropdown';
        const id = 'testDropdownId';
        const required = true;

        const { container } = render(
            <Dropdown options={options} name={name} id={id} required={required} />
        );

        const tree = container.firstChild;
        expect(tree).toMatchSnapshot();
    });

});
