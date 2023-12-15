import * as Scrivito from 'scrivito';
import { screen } from '@testing-library/react';
import { FormStepContainerWidget } from '../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass';
import { FormStepWidget } from '../../../src/Widgets/FormStepWidget/FormStepWidgetClass';
import { FormDateWidget } from '../../../src/Widgets/FormDateWidget/FormDateWidgetClass';
import '../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent';
import '../../../src/Widgets/FormStepWidget/FormStepWidgetComponent';
import '../../../src/Widgets/FormDateWidget/FormDateWidgetComponent';
import PageRenderer from '../../helpers/pageRenderer';

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();
const widgetProps = {
  formId: "test-id",
  failedMessage: "failed",
  submittedMessage: "submitted",
  submittingMessage: "submitting",
  hiddenFields: [],
  formType: "single-step",
  steps: [],
  forwardButtonText: "forward",
  backwardButtonText: "back",
  submitButtonText: "submit",
  showBorder: false,
  showReview: true,
  includeEmptyAnswers: false,
  showStepsInReview: false,
  showReviewHeader: false,
  showReviewFooter: false,
  reviewButtonText: "Review",
  reviewHeaderTitle: "Review header",
  reviewCloseButtonText: "Close",
  singleSubmitButtonAlignment: "left",
}

describe('FormStepContainerWidget', () => {

  const lodashEsModule = require('lodash-es');

  it('does not render with missing instanceId', () => {
    lodashEsModule.isEmpty.mockReturnValue(true);
    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)],
    });

    const container = document.querySelector('form')
    const emptyTenantElement = document.querySelector(".scrivito-neoletter-form-widgets.missing-id")
    expect(container).not.toBeInTheDocument();
    expect(emptyTenantElement).toBeInTheDocument();

  });

  it("renders with single step mode", () => {
    lodashEsModule.isEmpty.mockReturnValue(false);
    const items = [new FormDateWidget({ customFieldName: "custom_date", title: "date", dateType: "date" })];
    const step = new FormStepWidget({ isSingleStep: true, items: items });
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, steps: [step] })],
    });

    const submitButtonText = screen.getByText(widgetProps.submitButtonText);
    const multiStepsFooterContainer = document.querySelector('.form-buttons');
    const allSteps = document.querySelectorAll('div[data-step-number]');
    expect(submitButtonText).toBeInTheDocument();
    expect(multiStepsFooterContainer).not.toBeInTheDocument();
    expect(allSteps).toHaveLength(1);
  });

  it("renders with multiple steps mode", () => {
    lodashEsModule.isEmpty.mockReturnValue(false);
    const items = [new FormDateWidget({ customFieldName: "custom_date", title: "date", dateType: "date" })];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    const secondStep = new FormStepWidget({ isSingleStep: false, items: items });
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, steps: [firstStep, secondStep], formType: "multi-step" })],
    });

    const multiStepsFooterContainer = document.querySelector('.form-buttons');
    const allSteps = document.querySelectorAll('div[data-step-number]');
    expect(multiStepsFooterContainer).toBeInTheDocument();
    expect(allSteps).toHaveLength(2);
  });

  it("shows submit & review buttons in the last step", () => {
    lodashEsModule.isEmpty.mockReturnValue(false);
    const items = [new FormDateWidget({ customFieldName: "custom_date", title: "date", dateType: "date" })];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, steps: [firstStep], formType: "multi-step" })],
    });

    const multiStepsFooterContainer = document.querySelector('.form-buttons');
    const reviewButton = document.querySelector('.review-button');
    const submitButton = document.querySelector('.forward-button');
    const allSteps = document.querySelectorAll('div[data-step-number]');
    expect(multiStepsFooterContainer).toBeInTheDocument();
    expect(allSteps).toHaveLength(1);
    expect(reviewButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent(widgetProps.submitButtonText);
  });

  it("shows border", () => {
    lodashEsModule.isEmpty.mockReturnValue(false);
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, showBorder: true })],
    });

    const container = document.querySelector('.scrivito-neoletter-form-widgets.form-container-widget');
    expect(container).toHaveClass("form-border");
  });

  it('renders winnie-the-pooh', () => {
    lodashEsModule.isEmpty.mockReturnValue(false);

    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)],
    });
    const input = document.querySelector('input[name="fax"]')
    expect(input).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const items = [new FormDateWidget({ customFieldName: "custom_date", title: "date", dateType: "date" })];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    const secondStep = new FormStepWidget({ isSingleStep: false, items: items });

    const tree = pageRenderer.getAsJSON({ body: [new FormStepContainerWidget({ ...widgetProps, steps: [firstStep, secondStep], formType: 'multi-step' })] });
    expect(tree).toMatchSnapshot();
  });
});
