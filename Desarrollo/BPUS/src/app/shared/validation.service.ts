export class ValidationService {
  static emailValidator(control: any) {
    if (control.value.match('[^@]([A-Za-z0-9._]+){1,25}')) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static passwordValidator(control) {
    if (control.value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,32}')) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
