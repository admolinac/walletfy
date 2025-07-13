import { v4 as uuidv4 } from "uuid";
import type DataDS from "@/api/domain/DataDS";
import type { CreateEventType, EventType, UpdateEventType } from "@/types/eventType";


const EVENTS_KEY = 'events';

const sleep = (ms = 500) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class LocalStorageDS implements DataDS {

    async getEvents() {
        try {

            await sleep();
            const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? '[]';
            const events = JSON.parse(eventsRaw) as Array<EventType>;
            return events;

        } catch (error) {
            console.log(error);
            throw new Error('Error loading events.');
        }
    }

    async getEventById(id: string): Promise<EventType> {

        try {

            await sleep();
            const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? '[]';
            const events = JSON.parse(eventsRaw) as Array<EventType>;
            const event = events.find((e) => e.id === id);

            if (!event) throw new Error('Event not found');

            return event;

        } catch (error) {
            console.log(error);
            throw new Error(`Error loading event with id: ${id}.`);
        }
    }

    async saveEvent(event: CreateEventType): Promise<boolean> {

        try {

            await sleep();
            const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? '[]';
            const events = JSON.parse(eventsRaw) as Array<EventType>;

            const newEvent: EventType = {
                ...event,
                id: uuidv4()
            }

            events.push(newEvent);

            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
            return true;

        } catch (error) {
            console.log(error);
            throw new Error(`Error saving new event.`);
        }
    }

    async updateEvent(event: UpdateEventType): Promise<boolean> {
        try {

            await sleep();
            const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? '[]';
            const events = JSON.parse(eventsRaw) as Array<EventType>;

            const eventIndex = events.findIndex((e) => e.id === event.id);

            if (eventIndex === -1) throw new Error('Event not found.');

            events[eventIndex] = {
                ...events[eventIndex],
                ...event,
            };

            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

            return true;

        } catch (error) {
            console.error(error);
            throw new Error('Error updating event.');
        }
    }

    async deleteEvent(id: string): Promise<boolean> {
        try {

            await sleep();
            const eventsRaw = localStorage.getItem(EVENTS_KEY) ?? '[]';
            const events = JSON.parse(eventsRaw) as Array<EventType>;

            const eventIndex = events.findIndex((e) => e.id === id);

            if (eventIndex === -1) throw new Error('Event not found.');

            events.splice(eventIndex, 1);
            localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

            return true;

        } catch (error) {
            console.error(error);
            throw new Error('Error deleting event.');
        }
    }

}

export default LocalStorageDS;