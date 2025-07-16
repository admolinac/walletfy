import { Button, FileInput as MantineFileInput, Select as MantineSelect, TextInput } from '@mantine/core';
import { createFormHook, createFormHookContexts, useStore, } from '@tanstack/react-form';

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();


export const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: (props) => (
            <TextInput
                {...props}
                label={props.label}
                value={props.state.value}
                onChange={(e) => props.handleChange(e.target.value)}
                error={props.state.meta.errors?.[0]}
            />
        ),

        Select: (props) => (
            <MantineSelect
                {...props}
                label={props.label}
                data={props.options}
                value={props.state.value}
                onChange={(value) => props.handleChange(value)}
                error={props.state.meta.errors?.[0]}
            />
        ),

        FileInput: (props) => (
            <MantineFileInput
                {...props}
                label={props.label}
                value={props.state.value}
                onChange={(file) => props.handleChange(file ?? null)}
                error={props.state.meta.errors?.[0]}
                placeholder="Select file"
                clearable
            />
        ),

    },
    formComponents: {
        SubmitButton: (props) => (
            <Button type="submit" {...props} color="indigo">
                {props.children || 'Send'}
            </Button>
        ),
    },
    fieldContext,
    formContext,
});

export function useField() {
    try {
        const field = useFieldContext<unknown>();
        const errors = useStore(field.store, (state) => state.meta.errors);

        return {
            field,
            errors,
        };

    } catch {
        return {
            field: null,
            errors: [],
        }
    }
}
