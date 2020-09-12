import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer, BehaviorSubject } from 'rxjs';
import { connect, createLocalTracks, createLocalVideoTrack } from 'twilio-video';


@Injectable()
export class TwilioService {

  remoteVideo: ElementRef;
  localVideo: ElementRef;
  previewing: boolean;
  msgSubject = new BehaviorSubject("");
  roomObj: any;
  //const AccessToken = require('twilio').jwt.AccessToken;
  accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzhjZjc0YjRhN2E5M2ZiNTk2OGU3OWNkZTA2M2QyMjgyLTE1OTk0ODk2OTIiLCJncmFudHMiOnsiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTNjExYmEwMTNhNzJhNDBlY2FiMjA5MzgxOTk4ZTMyNmYifSwiaWRlbnRpdHkiOiJhbGVreWFAZ21haWwuY29tIn0sImlzcyI6IlNLOGNmNzRiNGE3YTkzZmI1OTY4ZTc5Y2RlMDYzZDIyODIiLCJleHAiOjE1OTk0OTMyOTIsIm5iZiI6MTU5OTQ4OTY5Miwic3ViIjoiQUM4NTdhMzgzZjViYmJkZGEyMTZmZWI4OWYwZmNhNTE2NCJ9.rv7jPpGFCR31XSITTFYnmdCr_ss65m1tFr7uZfRU0BE';

  constructor(private http: HttpClient) {}

  // getToken(username): Observable<any> {
  //   return this.http.post('url', { uid: 'alekya@gmail.com' });
  // }

  connectToRoom(accessToken: string, options): void {
    connect(accessToken, options).then(room => {

      this.roomObj = room;

      if (!this.previewing && options['video']) {
        this.startLocalVideo();
        this.previewing = true;
      }

      room.participants.forEach(participant => {
        this.msgSubject.next("Already in Room: '" + participant.identity + "'");
        // console.log("Already in Room: '" + participant.identity + "'");
        // this.attachParticipantTracks(participant);
      });

      room.on('participantDisconnected', (participant) => {
        this.msgSubject.next("Participant '" + participant.identity + "' left the room");
        // console.log("Participant '" + participant.identity + "' left the room");

        this.detachParticipantTracks(participant);
      });

      room.on('participantConnected',  (participant) => {
        participant.tracks.forEach(track => {
          this.remoteVideo.nativeElement.appendChild(track.attach());
        });

        // participant.on('trackAdded', track => {
        //   console.log('track added')
        //   this.remoteVideo.nativeElement.appendChild(track.attach());
        //   // document.getElementById('remote-media-div').appendChild(track.attach());
        // });
      });

      // When a Participant adds a Track, attach it to the DOM.
      room.on('trackAdded', (track, participant) => {
        console.log(participant.identity + " added track: " + track.kind);
        this.attachTracks([track]);
      });

      // When a Participant removes a Track, detach it from the DOM.
      room.on('trackRemoved', (track, participant) => {
        console.log(participant.identity + " removed track: " + track.kind);
        this.detachTracks([track]);
      });

      room.once('disconnected',  room => {
        this.msgSubject.next('You left the Room:' + room.name);
        room.localParticipant.tracks.forEach(track => {
          var attachedElements = track.detach();
          attachedElements.forEach(element => element.remove());
        });
      });
    });
  }

  attachParticipantTracks(participant): void {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks([tracks]);
  }

  attachTracks(tracks) {
    tracks.forEach(track => {
      this.remoteVideo.nativeElement.appendChild(track.attach());
    });
  }

  startLocalVideo(): void {
    createLocalVideoTrack().then(track => {
      this.localVideo.nativeElement.appendChild(track.attach());
    });
  }

  localPreview(): void {
    createLocalVideoTrack().then(track => {
      this.localVideo.nativeElement.appendChild(track.attach());
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  detachTracks(tracks): void {
    tracks.forEach(function (track) {
      track.detach().forEach(function (detachedElement) {
        detachedElement.remove();
      });
    });
  }

}
