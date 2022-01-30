import { FaylTur } from "./fayl-tur";
import { User } from "./user";

export interface Fayl{
    id: number;
    nom: string;
    faylTur: FaylTur;
    hajm: number;
    yaratuvchi: User;
    izoh: string;
}