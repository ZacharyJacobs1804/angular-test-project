import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email:string;
  role: string;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-user-modal',
  styleUrl: './user-modal.scss',
  templateUrl: './user-modal.html',
})
export class UserModal {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  // Sample users to be added to the User Modal
  users: User[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Jones', email: 'bob.jones@example.com', role: 'Developer' }
  ];

  // Form State
  currentUser: User = { id:0, name: '', email: '', role: 'User' };
  isEditing = false;

  closeModal(): void {
    this.resetForm();
    this.close.emit();
  }

  // Create | Update
  saveUser(): void {
    if (!this.currentUser.name || !this.currentUser.email) return;

    if (this.isEditing) {
      // Update existing user
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      // Create new
      const newUser = {
        ...this.currentUser,
        id: Date.now()
      };
      this.users.push(newUser);
    }
    this.resetForm();
  }

  // READ (Load into form for editing)
  editUser(user: User): void {
    this.currentUser = { ...user };
    this.isEditing = true;
  }

  //Delete
  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    if (this.currentUser.id === id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.currentUser = { id: 0, name: '', email: '', role: 'User' };
    this.isEditing = false;
  }
}
