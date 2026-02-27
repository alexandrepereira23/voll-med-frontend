import type { Medico, Paciente } from './types';

export interface Consulta {
    id: number;
    medico: Medico;
    paciente: Paciente;
    data: string;
}

export interface AgendamentoConsulta {
    idMedico?: number;
    idPaciente: number;
    data: string;
    especialidade?: string;
}

export interface CancelamentoConsulta {
    idConsulta: number;
    motivo: string;
}

export const MotivoCancelamento = {
    PACIENTE_DESISTIU: 'PACIENTE_DESISTIU',
    MEDICO_CANCELOU: 'MEDICO_CANCELOU',
    OUTROS: 'OUTROS',
} as const;

export type MotivoCancelamento = typeof MotivoCancelamento[keyof typeof MotivoCancelamento];
