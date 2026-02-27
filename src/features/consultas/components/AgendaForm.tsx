import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../../../lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useListaMedicos } from '../../medicos/hooks/useListaMedicos';
import { useListaPacientes } from '../../pacientes/hooks/useListaPacientes';

const agendamentoSchema = z.object({
    idPaciente: z.number().min(1, 'Paciente é obrigatório'),
    idMedico: z.number().optional().nullable(),
    data: z.string().min(1, 'Data e hora são obrigatórios'),
    especialidade: z.string().optional(),
});

type AgendamentoFormData = z.infer<typeof agendamentoSchema>;

interface AgendaFormProps {
    onClose: () => void;
}

export function AgendaForm({ onClose }: AgendaFormProps) {
    const queryClient = useQueryClient();
    const { data: medicos } = useListaMedicos(0);
    const { data: pacientes } = useListaPacientes(0);

    const { register, handleSubmit, formState: { errors } } = useForm<AgendamentoFormData>({
        resolver: zodResolver(agendamentoSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: AgendamentoFormData) => api.post('/consultas', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['consultas'] });
            onClose();
        },
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
                <header className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Agendar Consulta</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </header>

                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Paciente</label>
                        <select
                            {...register('idPaciente', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary outline-none transition-all bg-white"
                        >
                            <option value="">Selecione um paciente</option>
                            {pacientes?.content.map(p => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </select>
                        {errors.idPaciente && <span className="text-xs text-red-500">{errors.idPaciente.message}</span>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Médico (Opcional)</label>
                        <select
                            {...register('idMedico', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary outline-none transition-all bg-white"
                        >
                            <option value="">Selecione um médico</option>
                            {medicos?.content.map(m => (
                                <option key={m.id} value={m.id}>{m.nome} ({m.especialidade})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Data e Hora</label>
                        <input
                            type="datetime-local"
                            {...register('data')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary outline-none transition-all"
                        />
                        {errors.data && <span className="text-xs text-red-500">{errors.data.message}</span>}
                    </div>

                    <footer className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-6 py-2 bg-voll-secondary hover:bg-voll-primary text-white rounded-lg transition-colors shadow-sm disabled:opacity-50"
                        >
                            {mutation.isPending ? 'Agendando...' : 'Confirmar Agendamento'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
