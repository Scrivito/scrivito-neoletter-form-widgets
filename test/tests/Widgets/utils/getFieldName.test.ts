import { Widget } from 'scrivito';
import { getFieldName } from '../../../../src/Widgets/FormStepContainerWidget/utils/getFieldName';
import { isCustomType } from '../../../../src/Widgets/FormStepContainerWidget/utils/isCustomType';
import { DummyWidget } from '../../../helpers/dummyWidget';

describe('getFieldName', () => {
  it('should return customFieldName for custom type widgets', () => {
    const customFieldWidget = new DummyWidget({ customFieldName: 'CustomField' }) as unknown as Widget;
    const fieldName = getFieldName(customFieldWidget);

    expect(isCustomType(customFieldWidget)).toBe(true);
    expect(fieldName).toBe('CustomField');
  });

  it('should return type for non-custom type widgets', () => {
    const typeWidget = new DummyWidget({ type: 'email', customFieldName: 'CustomField' }) as unknown as Widget;
    const fieldName = getFieldName(typeWidget);

    expect(isCustomType(typeWidget)).toBe(false);
    expect(fieldName).toBe('email');
  });
});
