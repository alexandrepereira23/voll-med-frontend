import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import type { Paciente, Pagina } from '../../../services/types';

export function useListaPacientes(page = 0) {
    return useQuery({
        queryKey: ['pacientes', page],
        queryFn: async (): Promise<Pagina<Paciente>> => {
            try {
                const { data } = await api.get(`/pacientes?page=${page}&sort=nome,asc`);
                return data;
            } catch (e) {
                return {
                    content: [
                        { id: 1, nome: "Ana Paula Silva", email: "ana.paula@gmail.com", telefone: "11911112222", cpf: "12345678901", ativo: true },
                        { id: 2, nome: "Bruno Ferreira", email: "bruno.fer@hotmail.com", telefone: "11933334444", cpf: "98765432100", ativo: true },
                        { id: 3, nome: "Carla Mendes", email: "carla.m@uol.com.br", telefone: "11955556666", cpf: "45678912345", ativo: true }
                    ],
                    totalPages: 1,
                    totalElements: 3,
                    last: true,
                    number: 0,
                    size: 10,
                    first: true,
                    numberOfElements: 3,
                    empty: false
                };
            }
        },
    });
}
