import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Review } from '../../../../src/Widgets/FormStepContainerWidget/components/ReviewComponent';
import { Widget } from 'scrivito';
import { DummyWidget } from '../../../helpers/dummyWidget';

const onHideMock = jest.fn();
const reviewContent = [
  [{ title: 'Title 1', value: 'Value 1' }, { title: 'Title 2', value: 'Value 2' }],
  [{ title: 'Title 3', value: 'Value 3' }, { title: 'Title 4', value: 'Value 4' }],
];

const widget = new DummyWidget({
  showReviewHeader: true,
  reviewHeaderTitle: 'Review Header Title',
  showStepsInReview: true,
  showReviewFooter: true,
  reviewCloseButtonText: 'Close',
}) as unknown as Widget;

describe('Review', () => {

  it('renders the Review component with provided props, header and footer shown', () => {

    const { getByText } = render(
      <Review widget={widget} reviewContent={reviewContent} onHide={onHideMock} />
    );

    expect(getByText('Review Header Title')).toBeInTheDocument();
    expect(getByText('Step 0')).toBeInTheDocument();
    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Value 1')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();

    fireEvent.click(getByText('Close'));
    expect(onHideMock).toHaveBeenCalledTimes(1);
  });


  it('renders the Review component without header', () => {

    widget.update({ showReviewHeader: false });

    const { queryByText } = render(
      <Review widget={widget} reviewContent={reviewContent} onHide={onHideMock} />
    );

    expect(queryByText('Review Header Title')).toBeNull();
  });

  it('renders the Review component without steps', () => {
    widget.update({ showStepsInReview: false });

    const { queryByText } = render(
      <Review widget={widget} reviewContent={reviewContent} onHide={onHideMock} />
    );

    expect(queryByText('Step 0')).toBeNull();
    expect(queryByText('Step 1')).toBeNull();
  });

  it('renders the Review component without footer', () => {
    widget.update({ showReviewFooter: false });
    const { queryByText } = render(
      <Review widget={widget} reviewContent={reviewContent} onHide={onHideMock} />
    );

    expect(queryByText('Close')).toBeNull();
  });

  it('renders correctly', () => {
    widget.update({ showReviewFooter: true, showStepsInReview: true });
    render(
      <Review widget={widget} reviewContent={reviewContent} onHide={onHideMock} />
    );
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });
});

