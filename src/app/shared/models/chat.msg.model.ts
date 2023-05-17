// message interface (the interface between firebase database side and front end side)
export class ChatMessage {
    studentID ?: string;
    EmpEmail ?: string;
    message ?: string;
    timeSent?: string;
    sent?: boolean;
}