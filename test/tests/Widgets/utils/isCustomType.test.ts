import { Widget } from 'scrivito';
import { isCustomType } from '../../../../src/Widgets/FormStepContainerWidget/utils/isCustomType';
import { DummyWidget } from '../../../helpers/dummyWidget';

describe('isCustomType', () => {
  it('should identify a widget as custom type when type attribute is "custom"', () => {
    const customTypeWidget = new DummyWidget({ type: 'custom' }) as unknown as Widget;
    const isCustom = isCustomType(customTypeWidget);

    expect(isCustom).toBe(true);
  });

  it('should not identify a widget as custom type when type attribute is defined as non-empty', () => {
    const nonCustomTypeWidget = new DummyWidget({ type: 'someType' }) as unknown as Widget
    const isCustom = isCustomType(nonCustomTypeWidget);

    expect(isCustom).toBe(false);
  });
});
