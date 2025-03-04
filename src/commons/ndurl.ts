
export interface ndurl {
    name: string,
    desc?: string,
    url?: string,
}



interface message {
    id: number,
    author: number,
    content: string,
    hash: string, // todo: check if this is worth it
    edited?: number,    // deleted sets edited to 0 null, 0-2^128
}