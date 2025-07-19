import { useState } from "react";
import { Box, Button, Card, Flex, Grid, Text, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IconBuildingBank, IconPlus } from "@tabler/icons-react";
import { Link } from '@tanstack/react-router';
import { useMutation } from "@tanstack/react-query";
import type { AmountType } from "@/types/amountType";
import { currencyFormatter } from '@/utils/formatters';
import { useInitialMoneyForm } from "@/hooks/formHook";
import { notifications } from '@/utils/notification';
import { AmountSchema } from "@/types/amountType";
import useAppStore from "@/store";


function AddEventSection() {

    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const initialMoney = useAppStore((s) => s.initialMoney);
    const setInitialMoney = useAppStore((s) => s.setInitialMoney);

    const { mutate } = useMutation<
        boolean,
        Error,
        AmountType
    >({
        mutationKey: ['amount'],
        mutationFn: (value: AmountType) => {
            setInitialMoney(value.amount);
            return Promise.resolve(true);
        },
        onSettled: (_, error: Error | null) => {
            if (error) {
                notifications.error({
                    title: 'Error',
                    message:
                        error.message || 'An error occurred while setting the initial amount',
                });
            } else {
                notifications.success({
                    title: 'Success',
                    message: 'Initial amount added successfully!',
                });
            }
        }
    });


    const form = useInitialMoneyForm({
        defaultValues: {
            amount: initialMoney,
        },
        validators: {
            onSubmit: AmountSchema,
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

    return (
        <Grid justify="center" align="center" gutter="xl">
            <Grid.Col span={4}>
                <Box maw={320} mx="auto">
                    <form
                        className="flex flex-col gap-8"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <form.AppField
                            name="amount"
                            children={(field) => (
                                <field.NumberInput
                                    label="Initial amount"
                                ></field.NumberInput>
                            )}
                        >
                        </form.AppField>

                        <form.AppForm>
                            <form.SubmitButton
                                text="Calculate"
                            />
                        </form.AppForm>
                    </form>
                </Box>
            </Grid.Col>
            <Grid.Col span={4}>
                <Card radius="md" p="md" h="100%">
                    <Flex align="center" justify="center" gap="sm">
                        <ThemeIcon variant={isDark ? 'filled' : 'light'} size="xl" radius="xl">
                            <IconBuildingBank />
                        </ThemeIcon>
                        <Text size="xl" fw={700} c={isDark ? 'white' : 'indigo'}>
                            {currencyFormatter.format(initialMoney)}
                        </Text>
                    </Flex>
                    <Text size="sm" c="dimmed" mt="sm">Initial Balance</Text>
                </Card>
            </Grid.Col>
            <Grid.Col span={4}>
                <Button
                    component={Link}
                    to="/event/new"
                    leftSection={<IconPlus size={16} />}
                    variant={isDark ? 'filled' : 'light'}
                >
                    Add event
                </Button>
            </Grid.Col>
        </Grid >
    );
}

export default AddEventSection;