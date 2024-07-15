export namespace Validation {
  export const regExpPassword = /^(?=.*[a-zA-Z])(?=.*\d)[\w!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]*.{6,25}$/;
  export const regExpOtp = /^[0-9]{6}$/;
}
