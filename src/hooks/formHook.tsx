import { createFormHook, createFormHookContexts, useStore } from '@tanstack/react-form';
import { MantineTextField } from '@/components/form/Input';
import { MantineTextArea } from '@/components/form/TextArea';
import { MantineDateInput } from '@/components/form/DateInput';
import { MantineNumberInput } from '@/components/form/NumberInput';
import { MantineSelect } from '@/components/form/Select';
import { MantineButton } from '@/components/form/SubmitButton';

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

export function useField() {
    try {
        const field = useFieldContext<unknown>()
        const errors = useStore(field.store, (state) => (state as { meta: { errors: Array<any> } }).meta.errors)

        return {
            field,
            errors,
        };

    } catch {
        return {
            field: null,
            errors: [],
        };
    }
};

export const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: MantineTextField,
        TextArea: MantineTextArea,
        DateInput: MantineDateInput,
        NumberInput: MantineNumberInput,
        Select: MantineSelect
    },
    formComponents: {
        SubmitButton: (props) => (
            <MantineButton {...props}></MantineButton>
        )
    },
    fieldContext,
    formContext,
});

export const { useAppForm: useInitialMoneyForm } = createFormHook({
    fieldComponents: {
        NumberInput: MantineNumberInput,
    },
    formComponents: {
        SubmitButton: (props) => (
            <MantineButton {...props}></MantineButton>
        )
    },
    fieldContext,
    formContext,
})
