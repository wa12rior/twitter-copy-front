export class Tweet {
  public "@id"?: string;

  constructor(
    _id?: string,
    public content?: string,
    public createdBy?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    this["@id"] = _id;
  }
}
