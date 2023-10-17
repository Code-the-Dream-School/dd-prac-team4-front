import AlbumPreview from './AlbumPreview';
import AlbumChatBox from './AlbumChatBox';

const AlbumChat = ({ spotifyUrl }) => (
  <AlbumPreview spotifyUrl={spotifyUrl} wide>
    <AlbumChatBox spotifyUrl={spotifyUrl} />
  </AlbumPreview>
);

export default AlbumChat;
