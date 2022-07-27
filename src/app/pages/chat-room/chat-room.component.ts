import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

    conversations = [
        {name: "David", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false, },
        {name: "James", time:"8:21", latestMessage: "Good Morning!" ,  latestMessageRead: true},
        {name: "Andrew", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
        {name: "Richard", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: true},
        {name: "Dyno", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
        {name: "Julie", time:"8:21", latestMessage: "Good Morning!" , latestMessageRead: false},
      ]

  constructor() { }

  ngOnInit(): void {
  }

}




