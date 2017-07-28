from __future__ import absolute_import, unicode_literals

import os

import tornado.web

import spotify

from mopidy_spotify import backend, playback

class MyRequestHandler(tornado.web.RequestHandler):
    def initialize(self, core):
        self.core = core

    def get(self):
        self.write(
            'Hello, world! This is Mopidy %s' %
            self.core.get_version().get())
        list_of_uris = []
        uri = 'spotify:track:0Lx6O1tC3CPF1giLJIt5Jv'
        self.core.tracklist.clear()
        list_of_uris.append(uri)
        list_of_uris.append(uri)
        self.core.tracklist.add(list_of_uris)
        self.core.playback.next()
        self.core.playback.play()

# def play_song(core):
#     list_of_uris = []
#     uri = 'spotify:track:0Lx6O1tC3CPF1giLJIt5Jv'
#     list_of_uris.append(uri)
#     list_of_uris.append(uri)
#     core.tracklist.add(list_of_uris)
#     core.playback.next()
#     core.playback.play()
