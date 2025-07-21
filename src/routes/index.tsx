import dayjs from 'dayjs';
import { Box, Card, Container, Flex, SimpleGrid, Text, Title, useMantineColorScheme } from '@mantine/core';
import { createFileRoute, } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { EventType } from '@/types/eventType';
import EventItem from '@/components/event/EventItem';
import DataRepo from '@/api/datasource';
import AddEventSection from '@/components/event/EventSection';
import FinancialSummary from '@/components/event/FinancialSummary';
import useAppStore from '@/store';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {

    const { colorScheme } = useMantineColorScheme();
    const initialMoney = useAppStore((state) => state.initialMoney);
    const isDark = colorScheme === 'dark';

    const { isPending, error, data: events } = useQuery({
        queryKey: ['events'],
        queryFn: () => DataRepo.getEvents(),
        retry: 3,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false,
    });

    if (isPending) {
        return <Box p="md">Loading...</Box>;
    }

    if (error) {
        return <Box p="md" c="red">Error: {error.message}</Box>;
    }

    if (!Array.isArray(events) || events.length === 0) {
        return (
            <Container py="md" fluid>
                <Box mb="xl" className="text-center pb-4">
                    <AddEventSection />
                </Box>
                <Text size="md" c="dimmed">
                    👋 Welcome! Start by adding your events to track your income, expenses, monthly balance, and overall financial health.
                </Text>
            </Container>
        );
    }

    const eventsByMonthYear = events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort events by date from oldest to newest
        .reduce((acc: Record<string, Array<EventType>>, event: EventType) => { // Group events by month and year
            const key = dayjs(event.date).format('MMMM YYYY');
            acc[key] ??= [];
            acc[key].push(event);
            return acc;
        }, {});


    let lastGlobalBalance = initialMoney;

    const monthDataWithBalance = Object.entries(eventsByMonthYear).map(([monthYear, eventList]) => {
        const income = eventList
            .filter(e => e.type === 'income')
            .reduce((sum, e) => sum + e.amount, 0);

        const expense = eventList
            .filter(e => e.type === 'expense')
            .reduce((sum, e) => sum + e.amount, 0);

        const monthlyBalance = income - expense;
        const globalBalance = lastGlobalBalance + monthlyBalance;

        lastGlobalBalance = globalBalance;

        return {
            monthYear,
            eventList,
            income,
            expense,
            monthlyBalance,
            globalBalance
        };
    });


    return (
        <Container py="md" fluid>

            <Box mb="xl" className='text-center pb-4'>
                <AddEventSection />
            </Box>

            <Box mb="xl">
                <Text size="md" c="dimmed" mt="sm"> You have {events.length} events in {monthDataWithBalance.length} months</Text>
            </Box>

            <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl">
                {monthDataWithBalance.map(({ monthYear, eventList, monthlyBalance, globalBalance, income, expense }) => (
                    <Card
                        key={monthYear}
                        radius="md"
                        shadow="sm"
                        h="100%"
                        component={Flex}
                        withBorder
                    >
                        <Card.Section withBorder inheritPadding py="xs">
                            <Title order={4} c={isDark ? 'white' : 'indigo'}>
                                {monthYear}
                            </Title>
                        </Card.Section>

                        <Card.Section inheritPadding py="xs">
                            {eventList.map((event) => (
                                <EventItem key={event.id} {...event} />
                            ))}
                        </Card.Section>

                        <Card.Section inheritPadding py="xs" mt="auto" style={{ backgroundColor: isDark ? 'oklch(27.4% 0.006 286.033)' : 'oklch(96.2% 0.018 272.314)' }}>
                            <FinancialSummary income={income} expense={expense} monthlyBalance={monthlyBalance} globalBalance={globalBalance} />
                        </Card.Section>
                    </Card>
                ))}
            </SimpleGrid>

        </Container >
    );

}
