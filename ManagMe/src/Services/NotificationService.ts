import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../Models/Notification';
import { NotificationDialogComponent } from '../Components/NotificationDialog';
import { collection, getDocs } from "firebase/firestore"; 
import db from '../db';



class NotificationService {
    private notifications: Notification[] = [];
    private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject(this.notifications);
  
    constructor() {

      this.init()
    }

    private async init() {
      const querySnapshot = await getDocs(collection(db, "notifications/"));

      querySnapshot.forEach(doc => {
        this.notifications.push(doc.data() as Notification);
      });
    }
  
    send(notification: Notification): void {
      this.notifications.push(notification);
      this.notificationsSubject.next(this.notifications);
      // Show dialog for medium and high priority notifications
      if (notification.priority === 'medium' || notification.priority === 'high') {
        this.showDialog(notification);
      }
    }
  
    list(): Observable<Notification[]> {
      return this.notificationsSubject.asObservable();
    }
  
    unreadCount(): Observable<number> {
      return this.notificationsSubject.pipe(
        map(notifications => notifications.filter(notification => !notification.read).length)
      );
    }
  
    private showDialog(notification: Notification): void {
      new NotificationDialogComponent(notification).render(document.body);
    }
  }
  
  export default new NotificationService();
  