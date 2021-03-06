import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '@env/environment';

@Component({
  selector: 'app-upload-photo-file-tpl',
  templateUrl: './upload-photo-file-tpl.component.html',
  styleUrls: ['./upload-photo-file-tpl.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadPhotoFileTplComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UploadPhotoFileTplComponent),
      multi: true
    }
  ]
})
export class UploadPhotoFileTplComponent implements ControlValueAccessor {

  @Input() placeHolder?:string = '图片大小2M以内，支持jpg，png，gif等格式';
  @Input() Size?:string = 'large';
  @Input() isPhoto?:boolean = true;

  environment = environment;

  loading = false;
  
  avatarUrl?: string;

  constructor(private msg: NzMessageService) {}

  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';

    if (!isJpgOrPng) {
      this.msg.error('图片只能上传jpg，png，gif格式');
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('图片大小不得超过2M');
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

  writeValue(obj: string): void {
    console.log(obj);
    if(obj) {
      this.avatarUrl = environment.SERVER_URL + '/' + obj;
    }else {
      this.avatarUrl = '';
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