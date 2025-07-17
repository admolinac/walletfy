import { TextInput } from '@mantine/core';
import { useStore } from '@tanstack/react-form';
import { useField } from '@/hooks/formHook';

export function MantineTextField(props: {
    label: string;
    withAsterisk?: boolean;
    placeholder?: string;
}) {
    const fieldContext = useField();
    if (!fieldContext.field) {
        return null;
    }
    const error = useStore(fieldContext.field.store, (state) => state.meta.errors[0]);

    return (
        <TextInput
            label={props.label}
            placeholder={props.placeholder}
            value={fieldContext.field.state.value as string}
            onBlur={fieldContext.field.handleBlur}
            onChange={(e) => fieldContext.field.handleChange(e.target.value)}
            error={error?.message}
            withAsterisk={props.withAsterisk}
        />
    );
}