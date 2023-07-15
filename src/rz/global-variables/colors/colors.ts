import { TinyColor } from '@ctrl/tinycolor';

export interface MaterialPalette {
  [key: string]: {
    key: string,
    hex: string,
    isLight: boolean
  };
}

export interface SubPalette {
  main: string;
  lighter: string;
  darker: string;
}

type RGBA = any;

const MIX_AMOUNTS_PRIMARY = {
    50: [true, 12],
    100: [true, 30],
    200: [true, 50],
    300: [true, 70],
    400: [true, 85],
    500: [true, 100],
    600: [false, 87],
    700: [false, 70],
    800: [false, 54],
    900: [false, 25]
  } as any;

const MIX_AMOUNTS_SECONDARY = {
  A100: [15, 80, 65],
  A200: [15, 80, 55],
  A400: [15, 100, 45],
  A700: [15, 100, 40]
};

function multiply(rgb1: RGBA, rgb2: RGBA) {
    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
    return new TinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
  }

export function getPalette(color: string): MaterialPalette {
    const baseLight = new TinyColor('#ffffff');
    const baseDark = multiply(new TinyColor(color).toRgb(), new TinyColor(color).toRgb());
    const [, , , baseTriad] = new TinyColor(color).tetrad();

    const primary = Object.keys(MIX_AMOUNTS_PRIMARY)
      .map(k => {
        const [light, amount] = MIX_AMOUNTS_PRIMARY[k];
        return [k, new TinyColor(light ? baseLight : baseDark).mix(new TinyColor(color), amount)];
      });

    const accent = Object.keys(MIX_AMOUNTS_SECONDARY)
      .map(k => {
        const [amount, sat, light] = (MIX_AMOUNTS_SECONDARY as any)[k];
        return [k, new TinyColor(baseDark).mix(new TinyColor(baseTriad), amount)
          .saturate(sat).lighten(light)] as any;
      });

    return [...primary, ...accent].reduce((acc, [k, c]) => {
      acc[k] = c.toHexString();
      return acc;
    }, {});
}

export function createColorVariables(color: string, variableName: string): any {
  const colorPallette = getPalette(color);
  
  return { 
    [`${variableName}Lighter`]: colorPallette['100'],
    [`${variableName}`]: colorPallette['500'],
    [`${variableName}Darker`]: colorPallette['800'],
  }
}