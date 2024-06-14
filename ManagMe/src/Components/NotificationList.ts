import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Modal } from 'bootstrap';
import NotificationService from '../Services/NotificationService';
import { Notification } from '../Models/Notification';

export class NotificationListComponent {
  private notifications: Observable<Notification[]>;

  constructor() {
    this.notifications = NotificationService.list();
  }

  render(parent: HTMLElement): void {
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Show Notifications';
    button.addEventListener('click', () => {
      this.showNotificationsModal();
    });

    parent.appendChild(button);
  }

  private showNotificationsModal(): void {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.id = 'notifications-modal';
    modalElement.setAttribute('tabindex', '-1');
    modalElement.setAttribute('aria-labelledby', 'notifications-modal-label');
    modalElement.setAttribute('aria-hidden', 'true');

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'notifications-modal-label';
    modalTitle.textContent = 'Notifications';
    modalHeader.appendChild(modalTitle);
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.id = 'notifications-modal-body';

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    const closeButtonFooter = document.createElement('button');
    closeButtonFooter.type = 'button';
    closeButtonFooter.className = 'btn btn-secondary';
    closeButtonFooter.setAttribute('data-bs-dismiss', 'modal');
    closeButtonFooter.textContent = 'Close';
    modalFooter.appendChild(closeButtonFooter);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modalElement.appendChild(modalDialog);

    document.body.appendChild(modalElement);

    modalBody.innerHTML = '';

    this.notifications
      .pipe(
        map(notifications => {
          notifications.forEach(notification => {
            notification.read = true;
            const div = document.createElement('div');
            div.innerHTML = `
              <h3>${notification.title}</h3>
              <p>${notification.message}</p>
              <hr>
            `;
            modalBody.appendChild(div);
          });
        })
      )
      .subscribe({
        next: () => {
          const bootstrapModal = new Modal(modalElement);
          bootstrapModal.show();
        },
        error: err => {
          console.error('Error in notification subscription:', err);
        }
      });
  }
}
