import AlbumPreview from './AlbumPreview';

const AlbumChat = ({ spotifyUrl }) => (
  <AlbumPreview spotifyUrl={spotifyUrl} wide>
    <AlbumChat />
  </AlbumPreview>
);

export default AlbumChat;
