import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../Models/Notification';
import { NotificationDialogComponent } from '../Components/NotificationDialog';

const HOST_NAME = import.meta.env.VITE_HOST_NAME;

class NotificationService {
    private notifications: Notification[] = [];
    private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject(this.notifications);
  
    constructor() {

      this.init()
    }

    private async init() {
      try {
        // Fetch powiadomień z endpointu
        const response = await fetch(`${HOST_NAME}/notifications`);
        
        // Sprawdzenie, czy odpowiedź jest ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Pobranie danych z odpowiedzi
        const notifications: Notification[] = await response.json();
        
        // Dodanie powiadomień do this.notifications
        notifications.forEach(notification => this.send(notification));
        
        console.log('Notifications have been loaded:', this.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    // tworzyc powiadomienie przy czyms
  
    send(notification: Notification): void {
      this.notifications.push(notification);
      this.notificationsSubject.next(this.notifications);
      if (!notification.isread && (notification.priority === 'medium' || notification.priority === 'high')) {
        this.showDialog(notification);
      }
    }
  
    list(): Observable<Notification[]> {
      return this.notificationsSubject.asObservable();
    }
  
    unreadCount(): Observable<number> {
      return this.notificationsSubject.pipe(
        map(notifications => notifications.filter(notification => !notification.isread).length)
      );
    }
  
    private showDialog(notification: Notification): void {
      this.setNotificationRead(notification.id);
      new NotificationDialogComponent(notification).render(document.body);
    }

    async addNotification(notification: Omit<Notification, 'id'>): Promise<void> {
      try {
        const response = await fetch(`${HOST_NAME}/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notification),
        });
    
        if (!response.ok) {
          throw new Error('Failed to add notification.');
        }
    
        // Odczyt danych odpowiedzi (zwrócone powiadomienie z ID z bazy)
        const res = await response.json();
        const id = res.insertedId;
    
        this.send({id, ...notification});
    
      } catch (error) {
        console.error('Error adding notification:', error);
        throw new Error('Unable to add notification.');
      }
    }

    async setNotificationRead(id: number): Promise<void> {
      if (!id) {
        console.log('eee');
        return
      }

      try {
        const response = await fetch(`${HOST_NAME}/notifications/readnotification/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to add notification.');
        }
      } catch (error) {
        console.error('Error adding notification:', error);
        throw new Error('Unable to add notification.');
      }
    }
  }
  
  export default new NotificationService();
  