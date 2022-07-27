import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  Pusher from "pusher-js";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

    username = 'username';
    messages = [];
    message = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    // const pusher = new Pusher('10d6ae1025ceb435d335', {
    //   cluster: 'eu'
    // });

    // const channel = pusher.subscribe('chat');
    // channel.bind('message', data => {
    //   this.messages.push(data);
    // });
  }

//   submit() : void {
//     this.http.post(url:'http://localhost:4200/api/messages',body: {
//         username:this.username,
//         message:this.message
//     }).subscribe(next:() => this.message = "");
//   }
}
