import { useListaPacientes } from '../hooks/useListaPacientes';
import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { Paciente } from '../../../services/types';

export function PacientesPage() {
    const [page, setPage] = useState(0);
    const { data, isLoading, error } = useListaPacientes(page);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
                    <p className="text-gray-500">Gerencie os pacientes da clínica Voll.med</p>
                </div>
                <button className="bg-voll-secondary hover:bg-voll-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    Novo Paciente
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-voll-primary"></div>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">
                        Ocorreu um erro ao carregar os dados. Verifique se a API está online.
                    </div>
                ) : (
                    <>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">CPF</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data?.content.map((paciente: Paciente) => (
                                    <tr key={paciente.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{paciente.nome}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{paciente.cpf}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{paciente.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{paciente.telefone}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {data?.content.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            Nenhum paciente cadastrado no momento.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                Página {page + 1} de {data?.totalPages || 1}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 transition-all shadow-sm"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={data?.last}
                                    className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 transition-all shadow-sm"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
