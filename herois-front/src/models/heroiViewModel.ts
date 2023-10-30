import { Poder } from "./poder";

export interface HeroiViewModel {
    id?: number;
    nome: string;
    nomeHeroi: string;
    dataNascimento: string;
    peso: number;
    altura: number;
    superPoderes: Poder[]
}