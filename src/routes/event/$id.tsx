import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react';
import DataRepo from '@/api/datasource';
import type { CreateEventType } from '@/types/eventType';

export const Route = createFileRoute('/event/$id')({
    component: RouteComponent,
})

function RouteComponent() {

    const { id } = Route.useParams();
    const navigate = useNavigate();


    const [mode] = React.useState<'create' | 'update'>(
        id === 'new' ? 'create' : 'update',
    )

    const { data } = useQuery({
        enabled: mode === 'update',
        queryKey: ['event', id],
        queryFn: () => DataRepo.getEventById(id)
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<boolean, Error, CreateEventType>({
        mutationKey: ['event'],
        mutationFn: (values) => {
            if (mode === 'create') {
                return DataRepo.saveEvent(values);
            } else {
                return DataRepo.updateEvent({
                    ...values,
                    id: id,
                });
            }
        }
    })

    return <div>Hello "/event/$id"!</div>
}
