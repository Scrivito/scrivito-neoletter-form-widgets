import { prepareReviewContent } from "../../../../src/Widgets/FormStepContainerWidget/utils/prepareReviewContent";
import { setUpWidgetsAndForm } from "../../../helpers/utils";

jest.mock("lodash-es", () => ({
  map: jest.fn().mockImplementation((array, callback) => array.map(callback)),
  uniq: jest.fn().mockImplementation(array => [...new Set(array)]),
  isEmpty: jest
    .fn()
    .mockImplementation(
      value => value === null || value === undefined || value == ""
    )
}));

describe("prepareReviewContent", () => {
  it("should prepare review content with includeEmptyAnswers: false", () => {
    const mainWidget = setUpWidgetsAndForm(false);
    const reviewContent = prepareReviewContent(mainWidget);

    expect(reviewContent).toHaveLength(3);

    const hiddenInput = reviewContent[2].find(
      item => item.title === "hidden input"
    );
    expect(hiddenInput).toEqual({
      title: "hidden input",
      value: "i am hidden but included"
    });

    const label1 = reviewContent[1].find(item => item.title === "Label 1");
    expect(label1).toEqual({ title: "Label 1", value: "on" });

    const secondDate = reviewContent[2].find(
      item => item.title === "second date"
    );
    expect(secondDate).toEqual({ title: "second date", value: "12/31/2023" });

    const dateInput = reviewContent[1].find(item => item.title === "date");
    expect(dateInput).toBeUndefined();
  });

  it("should shoe empty answers with includeEmptyAnswers: true", () => {
    const mainWidget = setUpWidgetsAndForm(true);
    const reviewContent = prepareReviewContent(mainWidget);
    const dateInput = reviewContent[1].find(item => item.title === "date");
    expect(dateInput).toEqual({ title: "date", value: "-" });
  });
});
