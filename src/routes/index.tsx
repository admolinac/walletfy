import { Link, createFileRoute, } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import EventItem from '@/components/event/EventItem';
import DataRepo from '@/api/datasource';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

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


  return (
    <div className="text-center dark:bg-zinc-800 dark:text-white">

      <div>
        <Link to="/event/$id" params={{ id: 'new' }} className="text-blue-500 hover:underline">Add event</Link>
      </div>

      {events.map((mockEvent, index) => (
        <EventItem key={index} id={mockEvent.id} name={mockEvent.name} description={mockEvent.description} amount={mockEvent.amount} date={mockEvent.date} type={mockEvent.type}></EventItem>
      ))}
    </div>

  )
}
