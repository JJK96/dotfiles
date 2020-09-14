# Usage:
# Set environment variables:
#       SPOTIPY_USERNAME
#       SPOTIPY_CLIENT_ID
#       SPOTIPY_CLIENT_SECRET
# use functions defined here or use the `sp` object directly
import pprint
import string
import spotipy
from spotipy import util
import os
import sys
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, './spotifylyrics/')
sys.path.insert(0, filename)
import backend as lyrics

pp = pprint.PrettyPrinter(indent=4)
sp = None 

def refresh_token():
    global sp
    token = util.prompt_for_user_token(
        username=os.environ['SPOTIPY_USERNAME'],
        scope=
        'user-read-recently-played user-top-read user-follow-read user-follow-modify user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-read user-library-modify user-read-private user-read-birthdate user-read-email playlist-modify-public playlist-read-collaborative playlist-modify-private playlist-read-private streaming app-remote-control',
        redirect_uri="https://localhost",
        cache_path="/home/jjk/.cache/spotipy" )
    sp = spotipy.Spotify(auth=token)

refresh_token()

liked_from_radio = "2TE9Cna3qXSyBv7qEb3EiA"

# Find track and display audio features
# @Param search_string: search string or spotify URI, returns for first match found
def audio_features(search_string):
    if search_string.startswith('spotify'):
        id = search_string
    else:
        id = sp.search(search_string,
                       type='track').get('tracks').get('items')[0].get('id')
    track = sp.track(id)
    #pp.pprint(track)
    features = sp.audio_features(id)
    print("Track: ", track.get('name'), " - ",
          track.get('artists')[0].get('name'))
    pp.pprint(features)


# Find lyrics of all songs in given playlist
# @Param user: id of the owner of the playlist
# @Param playlist: id of the playlist
def get_lyrics(playlist, user=os.environ["SPOTIPY_USERNAME"]):
    tracks = sp.user_playlist_tracks(user, playlist)
    ret = []
    for track in tracks['items']:
        track = track['track']
        song = track['name']
        artist = track['artists'][0]['name']
        _lyrics, url, service_name, timed = lyrics.load_lyrics(artist, song)
        ret.append((artist, song, _lyrics))
    return ret


def get_lyrics_liked():
    return get_lyrics(liked_from_radio)


def sanitize(filename):
    valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
    return ''.join(c for c in filename if c in valid_chars)

def write_lyrics_liked():
    for i, (artist, song, _lyrics) in enumerate(get_lyrics_liked()):
        songlabel = "{} - {}".format(artist, song)
        with open("/home/jjk/Music/lyrics/{}.txt".format(sanitize(songlabel)), 'w+') as f:
            f.write("{}\n\n".format(songlabel))
            f.write(_lyrics)
            f.close()
        print(songlabel)

def get_song():
    return sp.currently_playing()['item']['id']

def add_to_playlist(playlist_id, song):
    sp.user_playlist_add_tracks(os.environ["SPOTIPY_USERNAME"], liked_from_radio, [song])

def like_current():
    add_to_playlist(liked_from_radio, get_song())
