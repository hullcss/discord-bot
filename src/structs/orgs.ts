import type { ndurl } from "./ndurl";


export interface Org {
    name: string;
    desc: string;
    urls?: { [key: string]: ndurl }
}
