import {default as appTheme} from './appTheme.json';
import {default as redTheme} from './redTheme.json';
import {default as greenTheme} from './greenTheme.json';
import {default as yellowTheme} from './yellowTheme.json';
import {light as lightTheme} from '@eva-design/eva';
import {dark as darkTheme} from '@eva-design/eva';

const light = {
  ...lightTheme,
  ...appTheme,
};

const dark = {
  ...darkTheme,
  ...appTheme,
};

const red = {
  ...darkTheme,
  ...redTheme,
};

const yellow = {
  ...darkTheme,
  ...yellowTheme,
};

const green = {
  ...darkTheme,
  ...greenTheme,
};

export const themes = {
  'Eva Light': light,
  'Eva Dark': dark,
  'App Theme': appTheme,
  'Red Theme': red,
  'Yellow Theme': yellow,
  'Green Theme': green,
};
export {ThemeContext} from './themeContext';
export {ThemeStore} from './themeStore';
export {ThemeService} from './themeService';
