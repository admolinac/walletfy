import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react';
import type { CreateEventType } from '@/types/eventType';
import DataRepo from '@/api/datasource';
import { EventForm } from '@/components/event/EventForm';

export const Route = createFileRoute('/event/$id')({
    component: RouteComponent,
})

function RouteComponent() {

    const { id } = Route.useParams();
    const navigate = useNavigate();




    const [mode] = React.useState<'create' | 'update'>(
        id === 'new' ? 'create' : 'update',
    )

    return (
        <>
            <EventForm mode={mode} title={mode === "create" ? "Create Event" : "Update Event"} />
        </>
    )
}
