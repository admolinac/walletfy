
import { useStore } from '@tanstack/react-form';
import { Textarea } from '@mantine/core';
import { useField } from '@/hooks/formHook';

export function MantineTextArea(props: {
    label: string;
    withAsterisk?: boolean;
    placeholder?: string;
}) {
    const { field } = useField();
    if (!field) return null;

    const error = useStore(field.store, (state) => state.meta.errors[0]);

    return (
        <Textarea
            label={props.label}
            placeholder={props.placeholder}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.currentTarget.value)}
            error={error}
            autosize
            minRows={2}
            maxRows={4}
            withAsterisk={props.withAsterisk}
        />
    );
}