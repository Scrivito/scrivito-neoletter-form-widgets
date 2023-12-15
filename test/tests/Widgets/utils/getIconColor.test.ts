
import { Widget } from 'scrivito';
import { getIconColor } from '../../../../src/Widgets/FormStepContainerWidget/utils/getIconColor';
import { DummyWidget } from '../../../helpers/dummyWidget';

describe('getIconColor', () => {
  it('should return custom color when colorType is "custom"', () => {
    const customColorWidget = new DummyWidget({ colorType: 'custom', customColor: '#ff0000' }) as unknown as Widget;
    const iconColor = getIconColor(customColorWidget);

    expect(iconColor).toBe('#ff0000');
  });

  it('should return secondary color when colorType is "secondary"', () => {
    const secondaryColorWidget = new DummyWidget({ colorType: 'secondary' }) as unknown as Widget;
    const iconColor = getIconColor(secondaryColorWidget);

    expect(iconColor).toBe('var(--bs-secondary, #f03a47)');
  });

  it('should return primary color when colorType is "primary"', () => {
    const primaryColorWidget = new DummyWidget({ colorType: 'primary' }) as unknown as Widget;
    const iconColor = getIconColor(primaryColorWidget);

    expect(iconColor).toBe('var(--bs-primary, #5c9dcd)');
  });

  it('should return "gold" as default color for other types', () => {
    const defaultColorWidget = new DummyWidget({ colorType: 'unknown' }) as unknown as Widget;
    const iconColor = getIconColor(defaultColorWidget);

    expect(iconColor).toBe('gold');
  });
});
