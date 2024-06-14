import { BehaviorSubject, Observable } from 'rxjs';
import NotificationService from '../Services/NotificationService';

export class NotificationCounterComponent {
  private unreadCount$: Observable<number>;

  constructor() {
    this.unreadCount$ = NotificationService.unreadCount();
  }

  render(parent: HTMLElement): void {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';

    const bellIcon = document.createElement('span');
    bellIcon.innerText = '🔔';
    bellIcon.style.fontSize = '24px';
    bellIcon.style.marginRight = '-8px';

    const countSpan = document.createElement('span');
    countSpan.style.backgroundColor = 'red';
    countSpan.style.color = 'white';
    countSpan.style.borderRadius = '50%';
    countSpan.style.padding = '4px 8px';
    countSpan.style.fontSize = '14px';
    countSpan.style.fontWeight = 'bold';

    this.unreadCount$.subscribe(count => {
      countSpan.innerText = count.toString();
    });

    container.appendChild(bellIcon);
    container.appendChild(countSpan);
    parent.appendChild(container);
  }
}
