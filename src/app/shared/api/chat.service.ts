import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public createRoomUrl = "http://127.0.0.1:8000/api/chats/create_room";
  public chatRoomsUrl = "http://127.0.0.1:8000/api/chats/my_rooms";
  public chatUserRoomsUrl = "http://127.0.0.1:8000/api/chats/user/rooms/{userId}";
  public chatSpecificRoomsUrl = "http://127.0.0.1:8000/api/chats/specific_room/{room_id}";
  public chatSendMessageUrl = "http://127.0.0.1:8000/api/chats/send_message";
  public chatMakeReadUrl = "http://127.0.0.1:8000/api/chats/mark_as_read/{id}";
  public chatDelMessageUrl = "http://127.0.0.1:8000/api/chats/delete_msg/{id}";

  constructor(private http: HttpClient) { }

  postNewRoom() {
    return this.http.post(this.createRoomUrl, "")
  }
  getChatRooms() {
    return this.http.get<any>(this.chatRoomsUrl)
  }
  getChatUserRooms() {
    return this.http.get<any>(this.chatUserRoomsUrl)
  }
  getChatSpecificRoom() {
    return this.http.get<any>(this.chatSpecificRoomsUrl)
  }
  postSendMessage() {
    return this.http.post<any>(this.chatSendMessageUrl, "")
  }
  putChatMakeRead() {
    return this.http.put<any>(this.chatMakeReadUrl, "")
  }
  getChatMakeRead() {
    return this.http.get<any>(this.chatDelMessageUrl)
  }
}
