export class User {
  public "@id"?: string;

  constructor(
    _id?: string,
    public email?: string,
    public username?: string,
    public roles?: string,
    public password?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public salt?: any
  ) {
    this["@id"] = _id;
  }
}
