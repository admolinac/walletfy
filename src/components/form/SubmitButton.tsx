import { Button, useMantineColorScheme } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

export function MantineButton(props: { text: string; }) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <Button
            type="submit"
            data-slot="submit"
            leftSection={<IconDeviceFloppy size={20} />}
            size='md'
            variant={isDark ? 'filled' : 'light'}
            fullWidth
        >
            {props.text}
        </Button>
    );
}