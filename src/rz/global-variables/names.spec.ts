import { names } from './names';

describe('names', () => {
  it('should support class names', () => {
    expect(names('foo-bar').className).toEqual('FooBar');
    expect(names('foo_bar').className).toEqual('FooBar');
    expect(names('fooBar').className).toEqual('FooBar');
    expect(names('[fooBar]').className).toEqual('FooBar');
    expect(names('[...fooBar]').className).toEqual('FooBar');
    expect(names('foo-@bar').className).toEqual('FooBar');
  });

  it('should support property names', () => {
    expect(names('foo-bar').propertyName).toEqual('fooBar');
    expect(names('foo_bar').propertyName).toEqual('fooBar');
    expect(names('FooBar').propertyName).toEqual('fooBar');
    expect(names('[fooBar]').propertyName).toEqual('fooBar');
    expect(names('[...fooBar]').propertyName).toEqual('fooBar');
    expect(names('foo-@bar').propertyName).toEqual('fooBar');
  });

  it('should support file names', () => {
    expect(names('foo-bar').fileName).toEqual('foo-bar');
    expect(names('foo_bar').fileName).toEqual('foo-bar');
    expect(names('FooBar').fileName).toEqual('foo-bar');
    expect(names('[fooBar]').fileName).toEqual('[foo-bar]');
    expect(names('[...fooBar]').fileName).toEqual('[...foo-bar]');
    expect(names('foo-@bar').fileName).toEqual('foo-@bar');
  });

  it('should support title names', () => {
    expect(names('foo-bar').titleName).toEqual('Foo Bar');
    expect(names('foo_bar').titleName).toEqual('Foo Bar');
    expect(names('fooBar').titleName).toEqual('Foo Bar');
    expect(names('[fooBar]').titleName).toEqual('Foo Bar');
    expect(names('[...fooBar]').titleName).toEqual('Foo Bar');
    expect(names('foo-@bar').titleName).toEqual('Foo Bar');
  });
});
