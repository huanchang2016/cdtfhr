import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '@env/environment';

@Component({
  selector: 'app-upload-file-photo',
  templateUrl: './upload-file-photo.component.html',
  styleUrls: ['./upload-file-photo.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFilePhotoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UploadFilePhotoComponent),
      multi: true
    }
  ]
})
export class UploadFilePhotoComponent implements ControlValueAccessor {

  @Input() placeHolder?: string = '请选择文件上传';
  @Input() Size?: string = 'large';

  environment = environment;

  loading = false;

  avatarUrl?: string;

  constructor(private msg: NzMessageService) { }

  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('只能上传jpg、png格式图片');
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('图片大小不得超过2M');
      return;
    }
    if (isJpgOrPng && isLt2M) {
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
    if (obj) {
      this.avatarUrl = environment.SERVER_URL + '/' + obj;
    } else {
      this.avatarUrl = '';
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.errors && control.errors.required) {
      // return this.date ? null : {
      //   isInvalid: {
      //     valid: false
      //   }
      // }
    } else {
      return null;
    }
  }
}
