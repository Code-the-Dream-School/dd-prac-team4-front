import { useParams } from 'react-router-dom';
import AlbumPreview from './AlbumPreview';
import AlbumChatBox from './AlbumChatBox';

const AlbumChat = ({ spotifyUrl }) => (
  <AlbumPreview spotifyUrl={spotifyUrl} wide contentLayout="row">
    <AlbumChatBox spotifyUrl={spotifyUrl} />
  </AlbumPreview>
};

export default AlbumChat;
