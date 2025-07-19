import { Button, Card, Flex, Grid, Text, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IconBuildingBank, IconPlus } from "@tabler/icons-react";
import { Link } from '@tanstack/react-router';
import { currencyFormatter } from '@/utils/formatters';


function AddEventSection() {

    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';


    return (
        <Grid justify="center" align="center">
            <Grid.Col span={4}>
                1
            </Grid.Col>
            <Grid.Col span={4}>
                <Card radius="md" p="md" withBorder h="100%">
                    <Flex align="center" justify="center" gap="sm">
                        <ThemeIcon variant={isDark ? 'filled' : 'light'} size="xl" radius="xl">
                            <IconBuildingBank />
                        </ThemeIcon>
                        <Text size="xl" fw={700} c={isDark ? 'white' : 'indigo'}>
                            {currencyFormatter.format(1000)}
                        </Text>
                    </Flex>
                    <Text size="sm" c="dimmed" mt="sm">Initial Money</Text>
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