import { MantineProvider, createTheme } from '@mantine/core'
import useAppStore from '@/store';

type ProviderProps = {
    children?: React.ReactNode
}

const themeConfig = createTheme({
    primaryColor: 'indigo',
    defaultRadius: 'md',
});

export function Provider({ children }: ProviderProps) {
    const theme = useAppStore((state) => state.theme);

    return (
        <MantineProvider
            theme={themeConfig}
            defaultColorScheme={theme}
            forceColorScheme={theme}
        >
            {children}
        </MantineProvider>)
}
