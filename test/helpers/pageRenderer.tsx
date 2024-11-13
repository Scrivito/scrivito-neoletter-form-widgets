/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as Scrivito from "scrivito";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { FormProvider } from "../../src/Widgets/FormStepContainerWidget/FormContext";

const PageDummy = Scrivito.provideObjClass("PageDummy", {
  attributes: {
    body: "widgetlist"
  }
});

class PageRenderer {
  private _pageClass;
  constructor(pageClass = PageDummy) {
    this._pageClass = pageClass;
  }

  private _getContentTag(configuration: any = {}) {
    const page = this._pageClass.create(configuration);
    (Scrivito as any).__setCurrentPage(page);

    return (
      <FormProvider
        value={{
          onInputChange: jest.fn(),
          getStepInfo: jest.fn(() => ({ stepNumber: 1, isActive: true, isSingleStep: false })),
          navigateOnClick: jest.fn()
        }}
      >
        <Scrivito.ContentTag tag="div" content={page} attribute="body" />
      </FormProvider>
    );
  }

  render(configuration: any = {}) {
    const content = this._getContentTag(configuration);
    return render(content);
  }

  getAsJSON(configuration: any = {}) {
    const content = this._getContentTag(configuration);
    return renderer.create(content).toJSON();
  }
}

export default PageRenderer;
