// FrameWork Imports
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  @ViewChild('Image', { static: false })
  name = 'Angular';
  fileToUpload: any;
  imageUrl!: string;
  userProfile: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('')
  });

  /**
   * 
   * @param file chenge event of the input function takes the files
   */
  handleFileInput(file: Event): void {
    this.fileToUpload = (file.target as HTMLInputElement).files?.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
