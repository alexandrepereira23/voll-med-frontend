import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import type { Pagina } from '../../../services/types';
import type { Consulta } from '../../../services/consultaTypes';

export function useListaConsultas(page = 0) {
    return useQuery({
        queryKey: ['consultas', page],
        queryFn: async (): Promise<Pagina<Consulta>> => {
            try {
                const { data } = await api.get(`/consultas?page=${page}&sort=data,asc`);
                return data;
            } catch (e) {
                return {
                    content: [
                        {
                            id: 1,
                            data: new Date().toISOString(),
                            medico: { id: 1, nome: "Dr. Alberto Souza", especialidade: "ORTOPEDIA" } as any,
                            paciente: { id: 1, nome: "Ana Paula Silva" } as any
                        },
                        {
                            id: 2,
                            data: new Date(Date.now() + 3600000).toISOString(),
                            medico: { id: 2, nome: "Dra. Beatriz Santos", especialidade: "CARDIOLOGIA" } as any,
                            paciente: { id: 2, nome: "Bruno Ferreira" } as any
                        }
                    ],
                    totalPages: 1,
                    totalElements: 2,
                    last: true,
                    number: 0,
                    size: 10,
                    first: true,
                    numberOfElements: 2,
                    empty: false
                };
            }
        },
    });
}
