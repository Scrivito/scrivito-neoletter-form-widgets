import "@testing-library/jest-dom";
import Scrivito from "scrivito";

// Mock the id() method of Scrivito.Widget.prototype globally
const originalIdMethod = Scrivito.Widget.prototype.id;

Scrivito.Widget.prototype.id = function () {
  return "staticWidgetID";
};

let consoleErrorSpy: jest.SpyInstance;
// Avoid getting Scrivito hover warning on almost every test
beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
  // Restore the id() method back to its original implementation after all tests
  Scrivito.Widget.prototype.id = originalIdMethod;
});

afterEach(() => {
  jest.clearAllMocks();
});
