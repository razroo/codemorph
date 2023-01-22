import { getPalette, createColorVariables } from './colors';

describe('getPalette', () => {
  it('should return a color palette', () => {
    const result = getPalette('#cc33ca');
    expect(result).toEqual(
        {"100": "#f0c2ef", "200": "#e699e5", "300": "#db70da", "400": "#d452d2", "50": "#f9e7f9", "500": "#cc33ca", "600": "#c72ec5", "700": "#c027bd", "800": "#b920b7", "900": "#ad14ab", "A100": "#ffffff", "A200": "#fadbff", "A400": "#f2a8ff", "A700": "#ef8fff"}
    );
  });  
});

describe('createColorVariables', () => {
  it('should properly create color variables', () => {
    const result = createColorVariables('#cc33ca', 'primary');
    const expected = {
      "primary": "#cc33ca",
      "primaryDarker": "#b920b7",
      "primaryLighter": "#f0c2ef",
    }
    expect(result).toEqual(expected);
  });
});