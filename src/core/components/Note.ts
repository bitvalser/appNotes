export class Note {
  public header: string;
  public text: string;
  public image: any;
  public map: any;
}

// tslint:disable-next-line:interface-name
export interface Notes {
  notes: Note[];
}
