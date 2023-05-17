import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { ChatMessage } from '../../models/chat.msg.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user !: any;
  private studentID !: string;
  private type !: string;
  ChatMessages !: AngularFireList<ChatMessage>
  userName !: string
  
  constructor( private db: AngularFireDatabase, afAuth: AngularFireAuth) { 
    // check Auth  in firebase before login 
    afAuth.authState.subscribe( auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth
      }
    })
  }
  // get all users by users path
  getUsers() {
    const path = '/users';
    return this.db.list(path).valueChanges()
  }
  
  // get one users by id
  getUser(id: string) {
    // firebase path 
    const path = `/users/${id}`;
    // return 
    return this.db.list(path).valueChanges()
  }

  // send Message to firebase
  sendMessage(msg: string){
    // set time in [Jan 27, 2022, 9:55:13 AM]
    const timestamp = this.getTimeStamp();

    let id = this.user?.uid;
    let EmpEmail = String(localStorage.getItem('EmpEmail'))
    // type of the person who logged in 
    let type = String(localStorage.getItem('type'))

    // get all available message and push the last one too 
    this.ChatMessages = this.getMessages();
    // chech if the user student or employee
    // if the user student "sent" property will be true
    if (type == 'student'){
      this.ChatMessages.push({
        studentID : id,
        EmpEmail : EmpEmail,
        message : msg,
        sent : true,
        timeSent : timestamp});
    } 
    // if the user is employee "sent" property will be false
    else if (type == 'employee'){
      this.ChatMessages.push({
        studentID : id,
        EmpEmail : EmpEmail,
        message : msg,
        sent : false,
        timeSent : timestamp});
    }
  }
  // after login firebase by ordinary user we save userID (studentID) in localstorage
  // but in employee login case we don't have studentID so we get it when click on student-email in (user-list)
  // save it to localstorage then pass it to "getMessagesByEmp" fun.
  // This happens if the student ID doesn't exist (in student dashboard)
  getMessages() : AngularFireList<ChatMessage> {
    this.studentID = String(localStorage.getItem('studentID'))
    // get all the messages ordered by time
    return this.db.list(`users/${this.studentID}/messages`, ref => {
      return ref.orderByKey()
    })
  }
  
  // This happens if the student ID is present (by employee)
  getMessagesByEmp(studentID : string) : AngularFireList<ChatMessage> {
    return this.db.list(`users/${studentID}/messages`, ref => {
      return ref.orderByKey()
    })
  }

  // time of the message 
  getTimeStamp(){
    const now = new Date()
    const date  = now.getUTCFullYear() + '/' +
                  (now.getUTCMonth()+1) + '/' +
                  now.getUTCDate();

    const time  = now.getUTCHours() + ':' +
                  now.getUTCMinutes() + ':' +
                  now.getUTCSeconds();

    return (date + ' ' + time)
  }
}
