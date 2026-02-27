export interface Endereco {
    logradouro: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    numero?: string;
    complemento?: string;
}

export const Especialidade = {
    ORTOPEDIA: 'ORTOPEDIA',
    CARDIOLOGIA: 'CARDIOLOGIA',
    GINECOLOGIA: 'GINECOLOGIA',
    DERMATOLOGIA: 'DERMATOLOGIA',
} as const;

export type Especialidade = typeof Especialidade[keyof typeof Especialidade];

export interface Medico {
    id: number;
    nome: string;
    email: string;
    crm: string;
    especialidade: Especialidade;
    telefone: string;
    ativo: boolean;
}

export interface Paciente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
}

export interface Pagina<T> {
    content: T[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
