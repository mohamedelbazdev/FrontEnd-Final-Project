import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
    import { PusherService } from '../../shared/services/pusher.service';
// import  Pusher from "pusher-js";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

    username = 'username';
    messages = [];
    message = '';
    conversations = [
        {name: "David", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false, },
        {name: "James", time:"8:21", latestMessage: "Good Morning!" ,  latestMessageRead: true},
        {name: "Andrew", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
        {name: "Richard", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: true},
        {name: "Dyno", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
        {name: "Julie", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
      ]

      title = 'Pusher Liker';
      likes: any =  10;
  constructor(private http: HttpClient,
              private pusherService: PusherService) { }

  ngOnInit(): void {

  }
}

