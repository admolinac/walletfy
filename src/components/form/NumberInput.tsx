import { NumberInput } from '@mantine/core';
import { useStore } from '@tanstack/react-form';
import { useField } from '@/hooks/formHook';

export function MantineNumberInput(props: {
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
        <NumberInput
            label={props.label}
            placeholder={props.placeholder}
            value={fieldContext.field.state.value as number}
            onBlur={fieldContext.field.handleBlur}
            onChange={(val) => fieldContext.field.handleChange(val)}
            error={error?.message}
            withAsterisk={props.withAsterisk}
            prefix="$"
            min={0}
            step={0.01}
        />
    );
}