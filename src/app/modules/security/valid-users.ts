export interface IValidUser {
    email: string;
    password: string;
    idCompany: number;
    idApprover: number;
    idUser: number;
}

export const loggedInUserLocalStorageKey = "loggedInUser";

export const validUsers: IValidUser[] = [
    {
        email: "ryamanakc@gmail.com",
        password: "ryamanakc",
        idUser: 11,
        idCompany: 1,
        idApprover: 11,
    },
    {
        email: "abraham@gmail.com",
        password: "abraham",
        idUser: 12,
        idCompany: 1,
        idApprover: 11,
    },
    {
        email: "k4ycer@gmail.com",
        password: "k4ycer",
        idUser: 13,
        idCompany: 1,
        idApprover: 11,
    },
    {
        email: "jorge@gmail.com",
        password: "jorge",
        idUser: 14,
        idCompany: 1,
        idApprover: 11,
    },
    {
        email: "juliox@gmail.com",
        password: "juliox",
        idUser: 15,
        idCompany: 1,
        idApprover: 11,
    },
];

export function getActiveUser(): IValidUser {
    return <IValidUser>JSON.parse(localStorage.getItem(loggedInUserLocalStorageKey));
}