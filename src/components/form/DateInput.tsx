
import dayjs from 'dayjs';
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
            value={field.state.value as Date}
            onBlur={field.handleBlur}
            onChange={(val) => handleChange(val)}
            error={error?.message}
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            valueFormat="DD/MM/YYYY"
            withAsterisk={props.withAsterisk}
            dropdownType="modal"
        />
    );

    function handleChange(value: string | null) {
        console.log('DatePickerInput value changed:', value);
        if (value) {
            const validDate = dayjs(value).startOf('day').toDate();
            field?.handleChange(validDate);
        } else {
            field?.handleChange(dayjs().toDate());
        }
    }
}