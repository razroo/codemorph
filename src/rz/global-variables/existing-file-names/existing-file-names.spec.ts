import { existingFileNames } from './existing-file-names';

describe('existingFileNames', () => {
  it('should support class existingFileNames', () => {
    expect(existingFileNames('foo-bar').existingFileClassName).toEqual('FooBar');
    expect(existingFileNames('foo_bar').existingFileClassName).toEqual('FooBar');
    expect(existingFileNames('fooBar').existingFileClassName).toEqual('FooBar');
    expect(existingFileNames('[fooBar]').existingFileClassName).toEqual('FooBar');
    expect(existingFileNames('[...fooBar]').existingFileClassName).toEqual('FooBar');
    expect(existingFileNames('foo-@bar').existingFileClassName).toEqual('FooBar');
  });

  it('should support property existingFileNames', () => {
    expect(existingFileNames('foo-bar').existingFilePropertyName).toEqual('fooBar');
    expect(existingFileNames('foo_bar').existingFilePropertyName).toEqual('fooBar');
    expect(existingFileNames('FooBar').existingFilePropertyName).toEqual('fooBar');
    expect(existingFileNames('[fooBar]').existingFilePropertyName).toEqual('fooBar');
    expect(existingFileNames('[...fooBar]').existingFilePropertyName).toEqual('fooBar');
    expect(existingFileNames('foo-@bar').existingFilePropertyName).toEqual('fooBar');
  });

  it('should support title existingFileNames', () => {
    expect(existingFileNames('foo-bar').existingFileTitleName).toEqual('Foo Bar');
    expect(existingFileNames('foo_bar').existingFileTitleName).toEqual('Foo Bar');
    expect(existingFileNames('fooBar').existingFileTitleName).toEqual('Foo Bar');
    expect(existingFileNames('[fooBar]').existingFileTitleName).toEqual('Foo Bar');
    expect(existingFileNames('[...fooBar]').existingFileTitleName).toEqual('Foo Bar');
    expect(existingFileNames('foo-@bar').existingFileTitleName).toEqual('Foo Bar');
  });
});
