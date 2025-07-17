
import { useStore } from '@tanstack/react-form';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useField } from '@/hooks/formHook';

export function MantineDateInput(props: {
    label: string;
    withAsterisk?: boolean;
    placeholder?: string;
}) {
    const { field } = useField();
    if (!field) return null;

    const error = useStore(field.store, (state) => state.meta.errors[0]);

    return (
        <DatePickerInput
            label={props.label}
            placeholder={props.placeholder}
            value={field.state.value as string}
            onBlur={field.handleBlur}
            onChange={(val) => field.handleChange(val ?? new Date())}
            error={error}
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            valueFormat="DD/MM/YYYY"
            withAsterisk={props.withAsterisk}
            dropdownType="modal"
        />
    );
}