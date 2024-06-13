import NotificationService from "../Services/NotificationService";
import { NotificationCounterComponent } from "./NotificationCounter";
import { NotificationListComponent } from "./NotificationList";

interface ThemeToggleButton {
    buttonElement: HTMLButtonElement;
    toggleTheme: () => void;
  }
  


  export default class HeaderComponent {
    private container: HTMLDivElement;
  
    constructor() {
      this.container = document.createElement('div');
      this.container.className = 'container d-flex justify-content-between align-items-center';

      const currentTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-bs-theme', currentTheme);

        //NotificationService.send({title: 'test', message: 'loremisaidfsidfjsdfj', date: new Date().toDateString(), priority: 'medium', read: false})
    }
  
    render(parent: HTMLElement): void {
      const header = document.createElement('header');
      header.className = 'w-100 py-3';
  
      const h1 = document.createElement('h1');
      h1.className = 'm-0';
      const a = document.createElement('a');
      a.href = '/';
      a.textContent = 'ManagMe';
      h1.appendChild(a);

      const div = document.createElement('div');
      div.setAttribute('id', 'notification-container');
      div.className = 'd-flex justify-content-between align-items-center';
  
      const nav = document.createElement('nav');
      nav.className = 'd-flex';
      const homeLink = document.createElement('a');
      homeLink.href = '/';
      homeLink.className = 'btn btn-primary';
      homeLink.textContent = 'Home';
  
      const toggleThemeButton = document.createElement('button');
      toggleThemeButton.className = 'btn btn-dark';
      toggleThemeButton.id = 'toggle-theme-btn';
      toggleThemeButton.textContent = 'Toggle Theme';
  
      nav.appendChild(homeLink);
      nav.appendChild(toggleThemeButton);

      this.appendNotificationComponents(div);

      nav.appendChild(div);
  
      this.container.appendChild(h1);
      this.container.appendChild(nav);
      header.appendChild(this.container);
      parent.prepend(header);
  
      // Add event listener for the theme toggle button
      const themeToggleButton: ThemeToggleButton = {
        buttonElement: toggleThemeButton,
        toggleTheme: this.toggleTheme,
      };
      themeToggleButton.buttonElement.addEventListener('click', themeToggleButton.toggleTheme);
    }
  
    private toggleTheme(): void {
        const newTheme = document.body.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        // Ustaw nowy temat na elemencie body
        document.body.setAttribute('data-bs-theme', newTheme);
        // Zapisz nowy temat do localStorage
        localStorage.setItem('theme', newTheme);
    }

    private appendNotificationComponents(parent: HTMLElement) {
        new NotificationListComponent().render(parent);
        new NotificationCounterComponent().render(parent);
    }
  }