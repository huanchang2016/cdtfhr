import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadLogoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UploadLogoComponent),
      multi: true
    }
  ]
})
export class UploadLogoComponent implements ControlValueAccessor {

  @Input() placeHolder?:string = '请选择文件上传';
  @Input() Size?:string = 'large';

  loading = false;
  avatarUrl?: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        return;
      }
      if(isJpgOrPng && isLt2M) {
        // Get this url from response in real world.
        this.getBase64(file, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        this.propagateChange(file);
      }
      return false;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private propagateChange = (_: any) => { };

  writeValue(obj: any): void {
    console.log(obj);
    if(obj) {
      this.avatarUrl = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.errors && control.errors.required) {
      // return this.date ? null : {
      //   isInvalid: {
      //     valid: false
      //   }
      // }
    }else {
      return null;
    }
  }
}
