import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MessageTexts{
    static errorMessage = "Хатолик рўй берди. Тармоқ ишлаб турганига ишонч ҳосил қилинг";
    static successMessage = "Муваффақиятли";
    static loginError   = "Логин ёки пароль нотўғри";
}