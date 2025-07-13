import type DataDS from "@/api/domain/DataDS";
import type { CreateEventType, EventType, UpdateEventType } from "@/types/eventType";


class DataRepoImpl implements DataDS {

    constructor(private data: DataDS) { }

    async getEvents(): Promise<Array<EventType>> {
        return await this.data.getEvents();
    }

    async getEventById(id: string): Promise<EventType> {
        return await this.data.getEventById(id);
    }

    async saveEvent(event: CreateEventType): Promise<boolean> {
        return await this.data.saveEvent(event);
    }

    async updateEvent(event: UpdateEventType): Promise<boolean> {
        return await this.data.updateEvent(event);
    }

    async deleteEvent(id: string): Promise<boolean> {
        return await (this.data.deleteEvent(id));
    }

}

export default DataRepoImpl;

