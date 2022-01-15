export class ProfileFollow {
  public "@id"?: string;

  constructor(_id?: string, public source?: string, public target?: string) {
    this["@id"] = _id;
  }
}
