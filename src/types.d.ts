export interface Theme {
  colors: Colors
  button: Button
  font: Font
  borderRadius: string
  borderRadiusSmall: string
  padding: string
  marginTop: string
  marginBottom: string
  boxShadow: string
}

interface Font {
  fontColor: string
}

interface Button {
  primary: string
  secondary: string
  bgPrimary: string
  bgSecondary: string
  padding: string
  borderRadius: string
}

interface Colors {
  primary: string
  secondary: string
  bgPrimary: string
  bgSecondary: string
  bgSpecial: string
}

export interface KPI {
  icon: string
  value: number | string
  text: string
}
