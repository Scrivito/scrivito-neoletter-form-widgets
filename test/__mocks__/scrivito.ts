import { mockUiContext, validationResults } from "../helpers/testData";

const originalModule = jest.requireActual("scrivito");
let mockedCurrentPage = Object.create(null);

module.exports = {
  ...originalModule,
  isInPlaceEditingActive: jest.fn().mockReturnValue(false),
  __setCurrentPage: (page: unknown) => (mockedCurrentPage = page),
  currentPage: jest.fn().mockImplementation(() => mockedCurrentPage),
  currentWorkspaceId: jest.fn().mockReturnValue("edit-mode"),
  urlFor: jest.fn(() => "mocked-url"),
  validationResultsFor: jest.fn().mockReturnValue(validationResults),
  uiContext: jest.fn().mockReturnValue(mockUiContext),
  canWrite: jest.fn().mockReturnValue(true)
};
