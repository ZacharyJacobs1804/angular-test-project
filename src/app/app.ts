import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModal } from './user-modal/user-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('test_project');

  isModalOpen = false;

  openModal(): void{
    this.isModalOpen = true;
  }

  closeModal(): void{
    this.isModalOpen = false;
  }
}
