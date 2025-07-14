import { createFileRoute } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import type { EventType } from '@/types/eventType';
import EventItem from '@/components/EventItem';


export const Route = createFileRoute('/')({
  component: App,
})


const mockEvents: Array<EventType> = [
  {
    id: uuidv4(),
    name: "Salary",
    description: "Monthly salary deposit",
    amount: 2500,
    date: new Date("2025-07-01"),
    type: "income",
    attachment: "payslip_july.pdf",
  },
  {
    id: uuidv4(),
    name: "Groceries",
    description: "Supermarket shopping",
    amount: 120.75,
    date: new Date("2025-07-05"),
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Freelance",
    description: "Website redesign project",
    amount: 800,
    date: new Date("2025-06-20"),
    type: "income",
    attachment: "invoice_freelance.pdf",
  },
  {
    id: uuidv4(),
    name: "Electricity bill",
    amount: 60.45,
    date: new Date("2025-07-10"),
    type: "expense",
  },
  {
    id: uuidv4(),
    name: "Gift",
    description: "Birthday gift from parents",
    amount: 100,
    date: new Date("2025-07-12"),
    type: "income",
  },
];


function App() {
  return (
    <div className="text-center dark:bg-zinc-800 dark:text-white">
      {mockEvents.map((mockEvent, index) => (
        <EventItem key={index} id={mockEvent.id} name={mockEvent.name} description={mockEvent.description} amount={mockEvent.amount} date={mockEvent.date} type={mockEvent.type}></EventItem>
      ))}
    </div>
  )
}
