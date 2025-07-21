import dayjs from "dayjs";
import { useEffect } from "react";
import { Container, Divider, Group, Paper, ThemeIcon, Title, useMantineColorScheme } from "@mantine/core";
import { IconCalendarDollar } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "@tanstack/react-router";
import type { CreateEventType } from "@/types/eventType";
import { CreateEventSchema } from "@/types/eventType";
import { useAppForm } from "@/hooks/formHook";
import { notifications } from '@/utils/notification';
import DataRepo from "@/api/datasource";

type EventFormType = {
    mode: 'create' | 'update';
    title: string;
    id?: string;
}

export const EventForm = (props: EventFormType) => {

    const { mode, id, title } = props;

    const navigate = useNavigate();

    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const defaultValues: CreateEventType = {
        name: '',
        description: '',
        amount: 0,
        date: dayjs().toDate(),
        type: 'income',
        attachment: '',
    }

    const { data } = useQuery({
        enabled: mode === 'update',
        queryKey: ['event', id],
        queryFn: () => DataRepo.getEventById(id!),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<
        boolean,
        Error,
        CreateEventType
    >({
        mutationKey: ['event'],
        mutationFn: async (values: CreateEventType) => {
            if (mode === 'create') {
                await DataRepo.saveEvent(values);
            } else {
                await DataRepo.updateEvent({
                    ...values,
                    id: id!,
                });
            }
            queryClient.invalidateQueries({
                queryKey: ["events"]
            })
            return true;
        },
        onSettled: (_, error: Error | null) => {
            if (isPending) {
                notifications.info({
                    title: 'Processing',
                    message: 'Saving event, please wait...',
                });
            }
            if (error) {
                notifications.error({
                    title: 'Error',
                    message:
                        error.message || 'An error occurred while saving the event',
                });
            } else {
                if (mode === 'create') {
                    notifications.success({
                        title: 'Success',
                        message: 'Event created successfully!',
                    });
                }
                if (mode === 'update') {
                    notifications.success({
                        title: 'Success',
                        message: 'Event updated successfully!',
                    });
                }
                navigate({ to: '/' });
            }
        },
    });

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: CreateEventSchema,
        },
        onSubmit: ({ value }) => {
            console.log('Form submitted with values:', value);
            mutate(value);
        },
        onSubmitInvalid: (errors) => {
            notifications.error({
                title: 'Validation Error',
                message: 'Please check the form for errors.',
            });
            console.error('Form submission errors:', errors);
        },
    });

    useEffect(() => {
        if (data) {
            form.reset(
                {
                    name: data.name,
                    description: data.description,
                    amount: data.amount,
                    date: data.date,
                    type: data.type,
                    attachment: data.attachment || '',
                } as CreateEventType,
                { keepDefaultValues: true },
            )
        }
    }, [data])

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
                                <IconCalendarDollar size={26} />
                            </ThemeIcon>
                            <Title order={3} className="tracking-tight font-medium" c={isDark ? "white" : "indigo"}>{title}</Title>
                        </Group>
                    </div>

                    <Divider className="mb-8" c={isDark ? "white" : "indigo"} />

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
                                    defaultValue="income"
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