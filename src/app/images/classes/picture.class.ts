import { DetailedPicture } from "./detailed-picture.class";

export class Picture {

    full: DetailedPicture;

    constructor(
        public id: string,
        public url: string) { }
}