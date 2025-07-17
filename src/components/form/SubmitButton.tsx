import { Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';

export function MantineButton(props: {
    text: string;
}) {
    return (
        <Button
            type="submit"
            data-slot="submit"
            leftSection={<IconDeviceFloppy size={20} />}
            size='md'
            variant="filled"
            fullWidth
        >
            {props.text}
        </Button>
    );
}