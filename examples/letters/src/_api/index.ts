import { ILetter } from "src/letters/interfaces/Letter.interface";


export interface UpdateLetterArgs {
    id: number
    newLetter: ILetter
}



export interface CreateLetterArgs {
    newLetter: ILetter
}


export const createLetter = async (args: CreateLetterArgs): Promise<{id: number}> => {
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: Math.floor(Math.random()*100)})
        } , 600)
    })
} 



export const updateLetter = async (args: UpdateLetterArgs): Promise<boolean> => {
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        } , 600)
    })
} 



export const loadLetters = async (): Promise<Array<ILetter>> => {

    
    const letters: Array<ILetter> = [
    {
        uid: 1,
        'body': 'Letter body',
        'from': 'ivanov@mail.ru',
        'subject': 'Hey there',
        'to': 'ananas@gmail.com'
    },
    {
        uid: 2,
        'body': 'Letter body',
        'from': 'ivanov@mail.ru',
        'subject': 'Hello1',
        'to': 'ananas@gmail.com'
    },
    {
        uid: 3,
        'body': 'Letter body',
        'from': 'no-reply@ozon.ru',
        'subject': 'Hello2',
        'to': 'asapovk@gmail.com'
    },
    {
        uid: 4,
        'body': 'Letter body',
        'from': 'ananas@gmail.com',
        'subject': 'Hello3',
        'to': 'ananas@gmail.com'
    },

]

    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(letters)
        } , 1000)
    })
}