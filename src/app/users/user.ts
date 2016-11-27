export class User {
  constructor(
    public firstName: string,
    public email: string,
    public gender: string,
    public role: string,
    public lastName?: string
  ) {}
}
