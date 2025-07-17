
import { Select } from '@mantine/core';
import { useStore } from '@tanstack/react-form';
import { useField } from '@/hooks/formHook';

export function MantineSelect(props: {
    label: string;
    placeholder?: string;
    data: Array<{ value: string; label: string }>;
    defaultValue?: string;
}) {
    const fieldContext = useField();
    if (!fieldContext.field) {
        return null;
    }
    const error = useStore(fieldContext.field.store, (state) => state.meta.errors[0]);

    return (
        <Select
            label={props.label}
            placeholder={props.placeholder}
            value={fieldContext.field.state.value as string}
            onBlur={fieldContext.field.handleBlur}
            onChange={(val) => fieldContext.field.handleChange(val)}
            error={error}
            data={props.data}
        />
    );
}