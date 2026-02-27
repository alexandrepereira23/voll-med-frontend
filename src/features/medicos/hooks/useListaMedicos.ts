import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import type { Medico, Pagina } from '../../../services/types';

export function useListaMedicos(page = 0) {
    return useQuery({
        queryKey: ['medicos', page],
        queryFn: async (): Promise<Pagina<Medico>> => {
            try {
                const { data } = await api.get(`/medicos?page=${page}&sort=nome,asc`);
                return data;
            } catch (e) {
                return {
                    content: [
                        { id: 1, nome: "Dr. Alberto Souza", email: "alberto.souza@voll.med", crm: "123456", telefone: "1199998888", especialidade: "ORTOPEDIA", ativo: true },
                        { id: 2, nome: "Dra. Beatriz Santos", email: "beatriz.santos@voll.med", crm: "654321", telefone: "1197776666", especialidade: "CARDIOLOGIA", ativo: true },
                        { id: 3, nome: "Dr. Carlos Oliveira", email: "carlos.oliver@voll.med", crm: "112233", telefone: "1195554444", especialidade: "GINECOLOGIA", ativo: true },
                        { id: 4, nome: "Dra. Daniela Lima", email: "daniela.lima@voll.med", crm: "445566", telefone: "1193332222", especialidade: "DERMATOLOGIA", ativo: true }
                    ],
                    totalPages: 1,
                    totalElements: 4,
                    last: true,
                    number: 0,
                    size: 10,
                    first: true,
                    numberOfElements: 4,
                    empty: false
                };
            }
        },
    });
}
