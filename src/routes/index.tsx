import dayjs from 'dayjs';
import { Box, Card, Container, Divider, Flex, SimpleGrid, Stack, Title, useMantineColorScheme } from '@mantine/core';
import { createFileRoute, } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { EventType } from '@/types/eventType';
import EventItem from '@/components/event/EventItem';
import DataRepo from '@/api/datasource';
import AddEventSection from '@/components/event/EventSection';
import FinancialSummary from '@/components/event/FinancialSummary';

export const Route = createFileRoute('/')({
    component: App,
})

function App() {


    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const { isPending, error, data: events } = useQuery({
        queryKey: ['events'],
        queryFn: () => DataRepo.getEvents(),
        retry: 3,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false,
    });

    if (isPending) {
        return <div className="p-4">Loading...</div>
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error.message}</div>
    }

    const eventsByMonthYear = events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort events by date from oldest to newest
        .reduce((acc: Record<string, Array<EventType>>, event: EventType) => { // Group events by month and year
            const key = dayjs(event.date).format('MMMM YYYY');
            acc[key] ??= [];
            acc[key].push(event);
            return acc;
        }, {});


    return (
        <Container py="md" fluid>

            <Box mb="xl" className='text-center pb-4'>
                <AddEventSection />
            </Box>

            <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl">
                {Object.entries(eventsByMonthYear).map(([monthYear, eventList]) => (
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
                            <FinancialSummary events={eventList} />
                        </Card.Section>
                    </Card>
                ))}
            </SimpleGrid>

        </Container >
    );

}
