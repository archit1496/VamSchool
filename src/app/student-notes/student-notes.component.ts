import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { StudentService } from 'src/service/student.service';
import { TwilioChatService } from 'src/service/twilio-chat.service';

import { Client } from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';
import { Message } from 'twilio-chat/lib/message';

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.css']
})
export class StudentNotesComponent implements OnInit {

  Chat = require('twilio-chat');
  notesList = [];
  isLoading = false;
  twilioToken;
  accessToken: any;
  roomName: string;
  username: string;
  message: string;
  public chatMessage: string;

  public chatClient: Client;

  @ViewChild('chatElement', null) chatElement: any;
  @ViewChild('chatDisplay', null) chatDisplay: any;

  public isConnected: boolean = false;
  public isConnecting: boolean = false;
  public isGettingChannels: boolean = false;
  private conSub: any;
  private disconSub: any;
  public channels: any[] = [];
  public channelObj: any;
  public typeObservable: any;
  public currentChannel: Channel;
  public messages: Message[] = [];
  public membersTyping: any = [];
  currentUsername: any;

  constructor(
    private studentService: StudentService,
    private chatService: TwilioChatService
  ) { }

  ngOnInit() {
    this.fetchNotes();
    this.isConnecting = true;
    //this.chatService.connect(localStorage.getItem('twackToken'));

    this.conSub = this.chatService.chatConnectedEmitter.subscribe(() => {
      this.isConnected = true;
      this.isConnecting = false;
      this.getChannels();

      this.chatService.chatClient.on('channelAdded', () => {
        this.getChannels();
      });
      this.chatService.chatClient.on('channelRemoved', () => {
        this.getChannels();
      });
      // this.chatService.chatClient.on('tokenExpired', () => {
      //   this.authService.refreshToken();
      // });
    })

    this.disconSub = this.chatService.chatDisconnectedEmitter.subscribe(() => {
      this.isConnecting = false;
      this.isConnected = false;
    });
  }

  getTwilioToken() {
    this.studentService.getTwilioToken().subscribe(res => {
      this.twilioToken = res;
      console.log("Token = " + JSON.stringify(this.twilioToken))
      this.accessToken = this.twilioToken.token;
      this.connect(this.accessToken);
    });
  }

  connect(accessToken) {
   this.chatService.connect(accessToken)
  }

  fetchNotes() {
    this.isLoading = true;
    this.studentService.fetchNotes().subscribe(res => {
      this.isLoading = false;
      this.notesList = res;
    })
    this.getTwilioToken();
  }

  readNotes(notes) {
    window.open(notes, "_new");
  }

  getChannels() {
    this.isGettingChannels = true;
    this.chatService.getPublicChannels().then((channels: any) => {
      console.log('getting al channels', channels);
      this.channelObj = channels;
      this.channels = this.channelObj.items;
      console.log(channels);
      this.isGettingChannels = false;
      /* clean em up
      this.channels.forEach( c => {
        this.chatService.getChannel(c.sid).then(ch => {
          ch.delete();
        })
      })
      */
    });
  }

  leaveChannel() {
    if (this.typeObservable) {
      this.typeObservable.unsubscribe();
    }
    if (this.currentChannel) {
      return this.currentChannel.leave().then((channel: Channel) => {
        channel.removeAllListeners('messageAdded');
        channel.removeAllListeners('typingStarted');
        channel.removeAllListeners('typingEnded');
      });
    }
    else {
      return Promise.resolve();
    }
  }

  enterChannel(sid: string) {
    this.messages = [];
    this.membersTyping = [];


    this.chatService.getChannel(sid).then(channel => {
      console.log('SID', sid);
      console.log(' current channel', channel);
      this.currentChannel = channel;
      console.log(channel);
      this.currentChannel.join()
        .then(r => {
          this.initChannel();
        })
        .catch(e => {
          if (e.message.indexOf('already exists') > 0) {
            this.initChannel();
          }
        });
    });
  }

  initChannel() {
    this.typeObservable = fromEvent(this.chatElement.nativeElement, 'keyup').subscribe(() => {
      this.typing();
    });

    this.currentChannel.on('messageAdded', (m) => {
      console.log('messages', m);
      this.messages.push(m);
      console.log('the message array', this.messages);
      const el = this.chatDisplay.nativeElement;
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      });
    });
    this.currentChannel.on('typingStarted', (m) => {
      this.membersTyping.push(m);
    });
    this.currentChannel.on('typingEnded', (m) => {
      const mIdx = this.membersTyping.findIndex(mem => mem.identity === m.identity);
      this.membersTyping = this.membersTyping.splice(mIdx, 0);
    });
  }

  typing() {
    this.currentChannel.typing();
  }

  whosTyping() {
    this.currentUsername = 'Alekya';
    return this.membersTyping.map(m => {
      if (m.identity !== this.currentUsername) {
        return m.identity;
      }
    }).join(', ');
  }

  sendMessage() {
    console.log('the chat message', this.chatMessage);
    this.currentChannel.sendMessage(this.chatMessage);
    this.chatMessage = null;
  }

  createChannel() {
    // let client = require('twilio-chat')('AC857a383f5bbbdda216feb89f0fca5164', '075c9bf3570946409cd7d129ee71862d');

    // client.chat.services(null)
    //   .channels
    //   .create()
    //   .then(channel => console.log(channel.sid));
    this.Chat.Client.createChannel({
      uniqueName: 'general',
      friendlyName: 'General Chat Channel',
      isPrivate: true
      }).then(function(channel) {
      console.log('Created general channel:');
      console.log(channel);
      });
  }

  ngOnDestroy() {
    this.conSub.unsubscribe();
    this.disconSub.unsubscribe();
  }


}
