import { createAsyncAction } from 'src/redux/helpers/actionCreator';
import { EventModel } from 'src/api/models/event.model';

const type = 'EVENT';

export const fetchEvent = createAsyncAction(type, 'EVENT', {
  request: (id: string) => ({ id }),
  success: (event: EventModel) => ({ event }),
});

export const fetchPopularEvents = createAsyncAction(type, 'POPULAR_EVENTS', {
  request: () => ({}),
  success: (events: EventModel[]) => ({ events }),
});
