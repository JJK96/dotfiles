import pprint
import spotipy
from spotipy import util
import os

token = util.prompt_for_user_token(
    username=os.environ['SPOTIPY_USERNAME'],
    scope='user-read-recently-played user-top-read user-follow-read user-follow-modify user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-read user-library-modify user-read-private user-read-birthdate user-read-email playlist-modify-public playlist-read-collaborative playlist-modify-private playlist-read-private streaming app-remote-control',
    redirect_uri="https://localhost"
)
sp = spotipy.Spotify(auth=token)
pp = pprint.PrettyPrinter(indent=4)


# Find track and display audio features
# @Param search_string: search string or spotify URI, returns for first match found
def audio_features(search_string):
    if search_string.startswith('spotify'):
        id = search_string
    else:
        id = sp.search(
            search_string,
            type='track').get('tracks').get('items')[0].get('id')
    track = sp.track(id)
    #pp.pprint(track)
    features = sp.audio_features(id)
    print("Track: ", track.get('name'), " - ",
          track.get('artists')[0].get('name'))
    pp.pprint(features)
