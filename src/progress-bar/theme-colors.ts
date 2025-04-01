import { ILoadedEventArgs, ProgressTheme } from "@syncfusion/ej2-react-progressbar";

export function loadProgressBarTheme (args: ILoadedEventArgs): string  {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    return args.progressBar.theme;
};
