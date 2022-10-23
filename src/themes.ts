import { Theme } from './types'

export const darkTheme: Theme = {
  colors: {
    primary: '#FFEDEC',
    secondary: '#787878',
    bgPrimary: '#202020',
    bgSecondary: '#171717',
    bgSpecial: '#292828'
  },
  button: {
    primary: '#fff',
    secondary: '#eee',
    bgPrimary: '#135846',
    bgSecondary: '#3d3d3d',
    bgSpecial: '#799283',
    padding: '0.8125rem 2.1875rem',
    borderRadius: '8px'
  },
  font: {
    fontColor: '#fff'
  },
  borderRadius: '12px',
  borderRadiusSmall: '10px',
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  boxShadow: '0px 10px 10px #1358463d'
}
export const lightTheme: Theme = {
  colors: {
    primary: '#000',
    secondary: '#eee',
    bgPrimary: '#fff',
    bgSecondary: '#f8f8f8',
    bgSpecial: '#fff'
  },
  button: {
    primary: '#fff',
    secondary: '#000',
    bgPrimary: '#135846',
    bgSecondary: '#3d3d3d',
    padding: '0.8125rem 2.1875rem',
    borderRadius: '8px',
    bgSpecial: '#799283'

  },
  font: {
    fontColor: '#fff'
  },
  borderRadius: '12px',
  borderRadiusSmall: '10px',
  padding: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  boxShadow: '0px 16px 30px #00000014'

}
