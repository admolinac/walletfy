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

    console.log('MantineProvider rendered with theme:', theme);

    return (
        <MantineProvider
            theme={themeConfig}
            forceColorScheme={theme}
        >
            {children}
        </MantineProvider>)
}
