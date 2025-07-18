import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { EventForm } from '@/components/event/EventForm';

export const Route = createFileRoute('/event/$id')({
    component: RouteComponent,
})

function RouteComponent() {

    const { id } = Route.useParams();

    const [mode] = React.useState<'create' | 'update'>(
        id === 'new' ? 'create' : 'update',
    )

    return (
        <>
            <EventForm
                mode={mode}
                title={mode === "create" ? "Create Event" : "Update Event"}
                id={mode === "update" ? id : undefined}
            />
        </>
    )
}
