import { Component, OnInit, Input, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { inOutAnimation } from 'src/app/animations/animations';
import { AuthService } from 'src/app/auth-module/service/auth-service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.scss'],
  animations: [inOutAnimation],
})
export class PasswordCheckComponent implements OnInit {
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<PasswordCheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {}

  sendPassowrd() {
    this.authService.checkPassword(this.password.value).subscribe((data) => {
      if (data.status) {
        this.dialogRef.close(true);
      } else {
        this.toastrService.error('Password is incorrect, try again', 'Error')
      }
    });
  }
}
