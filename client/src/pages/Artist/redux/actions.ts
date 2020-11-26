import { ArtistModel } from 'src/api/models/artist.model';
import { createAsyncAction } from 'src/redux/helpers/actionCreator';

const type = 'ARTIST';

export const fetchArtist = createAsyncAction(type, 'fetchArtist', {
  request: (id: string) => ({ id }),
  success: (artist: ArtistModel) => ({ artist }),
});
