import { Notification } from "../Models/Notification";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import NotificationService from "../Services/NotificationService";

export class NotificationDialogComponent {
    private notification: Notification;
  
    constructor(notification: Notification) {
      this.notification = notification;
    }
  
    render(parent: HTMLElement): void {
      const dialog = document.createElement('div');
      dialog.className = 'modal fade';
      dialog.tabIndex = -1;
      dialog.setAttribute('role', 'dialog');
  
      const dialogContent = document.createElement('div');
      dialogContent.className = 'modal-dialog';
      dialogContent.setAttribute('role', 'document');
  
      const dialogInner = document.createElement('div');
      dialogInner.className = 'modal-content';
  
      const header = document.createElement('div');
      header.className = 'modal-header';
  
      const title = document.createElement('h5');
      title.className = 'modal-title';
      title.textContent = this.notification.title;
  
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'btn-close';
      closeButton.setAttribute('data-bs-dismiss', 'modal');
      closeButton.setAttribute('aria-label', 'Close');
  
      const body = document.createElement('div');
      body.className = 'modal-body';
  
      const message = document.createElement('p');
      message.textContent = this.notification.message;
  
      const footer = document.createElement('div');
      footer.className = 'modal-footer';
  
      const footerCloseButton = document.createElement('button');
      footerCloseButton.type = 'button';
      footerCloseButton.className = 'btn btn-secondary';
      footerCloseButton.setAttribute('data-bs-dismiss', 'modal');
      footerCloseButton.textContent = 'Close';
  
      header.appendChild(title);
      header.appendChild(closeButton);
      body.appendChild(message);
      footer.appendChild(footerCloseButton);
  
      dialogInner.appendChild(header);
      dialogInner.appendChild(body);
      dialogInner.appendChild(footer);
      dialogContent.appendChild(dialogInner);
      dialog.appendChild(dialogContent);
      parent.appendChild(dialog);
  
      const bootstrapModal = new Modal(dialog);
      bootstrapModal.show();

      this.notification.isread = 1
      NotificationService.setNotificationRead(this.notification.id)
    }
  }