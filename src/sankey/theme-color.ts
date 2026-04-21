// theme-color.ts
import { ChartTheme, SankeyLoadedEventArgs } from '@syncfusion/ej2-react-charts';
function normalizeThemeToken(raw: string): ChartTheme {

  return (raw.charAt(0).toUpperCase() + raw.slice(1))
    .replace(/-dark/i, 'Dark')
    .replace(/contrast/i, 'Contrast')
    .replace(/-highContrast/i, 'HighContrast') as ChartTheme;
}

export function loadSankeyChartTheme(args: SankeyLoadedEventArgs): void {
  let selectedTheme: string = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
  args.chart.theme = normalizeThemeToken(selectedTheme);
}

export function loadChartTheme(args: { chart: { theme: ChartTheme } }): void {
  let selectedTheme: string = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
  args.chart.theme = normalizeThemeToken(selectedTheme);
}