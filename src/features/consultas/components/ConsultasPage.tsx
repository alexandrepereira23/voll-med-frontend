import { useListaConsultas } from '../hooks/useListaConsultas';
import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import type { Consulta } from '../../../services/consultaTypes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ConsultasPage() {
    const [page, setPage] = useState(0);
    const { data, isLoading, error } = useListaConsultas(page);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Agenda de Consultas</h1>
                    <p className="text-gray-500">Visualize e gerencie os agendamentos da clínica</p>
                </div>
                <button className="bg-voll-secondary hover:bg-voll-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Agendar Consulta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-50 rounded w-1/2"></div>
                            <div className="flex gap-2">
                                <div className="h-8 bg-gray-50 rounded w-full"></div>
                                <div className="h-8 bg-gray-50 rounded w-full"></div>
                            </div>
                        </div>
                    ))
                ) : error ? (
                    <div className="col-span-full p-12 text-center bg-red-50 rounded-2xl border border-red-100 text-red-600">
                        Falha na comunicação com o servidor.
                    </div>
                ) : data?.content.length === 0 ? (
                    <div className="col-span-full p-12 text-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-400">
                        Não há consultas agendadas para o período.
                    </div>
                ) : (
                    data?.content.map((consulta: Consulta) => (
                        <div key={consulta.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider">
                                    Cancelar
                                </button>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <User className="w-5 h-5 text-voll-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{consulta.paciente.nome}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Paciente</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-teal-50 p-2 rounded-lg">
                                    <Stethoscope className="w-5 h-5 text-voll-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{consulta.medico.nome}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Dr(a). Médico</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        {format(new Date(consulta.data), "dd 'de' MMMM", { locale: ptBR })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">
                                        {format(new Date(consulta.data), "HH:mm")}h
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!isLoading && data && data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-4">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30 shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-gray-500">
                        {page + 1} / {data.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={data.last}
                        className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30 shadow-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
