import { StringMap } from '../../types/types';

export class DummyWidget {
  public attributes: StringMap<any>;
  private fakeId: string;
  private className: string;

  constructor(attrs: StringMap<any>, className?: string) {
    this.attributes = attrs;
    this.fakeId = "fakeId";
    this.className = className || '';
  }

  public get(attr: string): string {
    return this.attributes[attr];
  }

  public update(attrs: StringMap<any>): void {
    for (const key in attrs) {
      this.attributes[key] = attrs[key];
    }
  }

  public id(): string {
    return this.fakeId;
  }

  public attributeDefinitions(): StringMap<any> {
    return this.attributes;
  }

  public objClass(): string {
    return this.className;
  }

  public widgets(): any[] {
    const widgets: any[] = [];
    for (const key in this.attributes) {
      const attributeValue = this.attributes[key];
      if (Array.isArray(attributeValue)) {
        for (const item of attributeValue) {
          if (item instanceof DummyWidget) {
            widgets.push(item);
          }
        }
      } else if (attributeValue instanceof DummyWidget) {
        widgets.push(attributeValue);
      }
    }
    return widgets;
  }

  public obj(): any {
  }
}
