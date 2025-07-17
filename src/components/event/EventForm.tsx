import { Container, Divider, Group, Paper, ThemeIcon, Title } from "@mantine/core";
import { IconBrandCashapp } from "@tabler/icons-react";
import type { CreateEventType } from "@/types/eventType";
import { CreateEventSchema } from "@/types/eventType";
import { useAppForm } from "@/hooks/formHook";


type EventFormType = {
    mode: 'create' | 'update';
    title: string
}

export const EventForm = (props: EventFormType) => {

    const defaultValues: CreateEventType = {
        name: '',
        description: '',
        amount: 0,
        date: new Date(),
        type: 'income',
        attachment: '',
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: CreateEventSchema,
        },
        onSubmit: ({ value }) => {
            console.log('Form submitted with values:', value)
        },
        onSubmitInvalid: (errors) => {
            console.error('Form submission errors:', errors)
        },
    });


    return (
        <div className="px-4 py-8 flex items-center justify-center">
            <Container size="sm" className="w-full">
                <Paper
                    shadow="md"
                    radius="md"
                    p="lg"
                    className="bg-white dark:bg-zinc-800 transition-colors"
                    withBorder
                >

                    <div className="rounded-md mb-6 px-6 py-4 bg-indigo-100 border-indigo-200 dark:bg-indigo-600 text-zinc-800 dark:text-white shadow">
                        <Group justify="center" gap="sm">
                            <ThemeIcon
                                variant="white"
                                size="xl"
                                radius="xl"
                                className="shadow-lg"
                            >
                                <IconBrandCashapp size={26} />
                            </ThemeIcon>
                            <Title order={3} className="tracking-tight font-medium">{props.title}</Title>
                        </Group>
                    </div>

                    <Divider className="mb-8" color="indigo" />

                    <form
                        className="flex flex-col gap-8"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >

                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.Input
                                    label="Event Name"
                                    placeholder="Enter event name"
                                    withAsterisk={true}
                                ></field.Input>
                            )}
                        >
                        </form.AppField>

                        <form.AppField
                            name="description"
                            children={(field) => (
                                <field.TextArea
                                    label="Description"
                                    placeholder="Enter event description"
                                    withAsterisk={false}
                                ></field.TextArea>
                            )}
                        >
                        </form.AppField>

                        <form.AppField
                            name="date"
                            children={(field) => (
                                <field.DateInput
                                    label="Event Date"
                                    placeholder="Select event date"
                                    withAsterisk={true}
                                ></field.DateInput>
                            )}
                        >
                        </form.AppField>

                        <form.AppField
                            name="amount"
                            children={(field) => (
                                <field.NumberInput
                                    label="Amount"
                                    placeholder="Enter amount"
                                    withAsterisk={true}
                                ></field.NumberInput>
                            )}
                        >
                        </form.AppField>

                        <form.AppField
                            name="type"
                            children={(field) => (
                                <field.Select
                                    label="Type"
                                    placeholder="Select event type"
                                    data={[{ value: 'income', label: 'Income' }, { value: 'expense', label: 'Expense' }]}
                                    defaultValue="income    "
                                ></field.Select>
                            )}
                        >
                        </form.AppField>

                        <form.AppForm>
                            <form.SubmitButton
                                text={props.mode === 'create' ? 'Create Event' : 'Update Event'}
                            />
                        </form.AppForm>

                    </form>
                </Paper>
            </Container>
        </div >
    )
}