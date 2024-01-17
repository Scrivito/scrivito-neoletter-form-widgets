const originalModule = jest.requireActual("lodash-es");

module.exports = {
  ...originalModule,
  isEmpty: jest.fn(),
  map: jest.fn(),
  range: jest.fn(),
  uniq: jest.fn(),
  times: jest.fn()
};
