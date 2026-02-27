import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../../../lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

const pacienteSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    telefone: z.string().min(8, 'Telefone inválido'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
    endereco: z.object({
        logradouro: z.string().min(3, 'Campo obrigatório'),
        bairro: z.string().min(3, 'Campo obrigatório'),
        cep: z.string().regex(/^\d{8}$/, 'CEP deve ter 8 dígitos'),
        cidade: z.string().min(2, 'Campo obrigatório'),
        uf: z.string().length(2, 'UF inválida'),
        numero: z.string().optional(),
        complemento: z.string().optional(),
    }),
});

type PacienteFormData = z.infer<typeof pacienteSchema>;

interface PacienteFormProps {
    onClose: () => void;
}

export function PacienteForm({ onClose }: PacienteFormProps) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<PacienteFormData>({
        resolver: zodResolver(pacienteSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: PacienteFormData) => api.post('/pacientes', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pacientes'] });
            onClose();
        },
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <header className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Cadastrar Novo Paciente</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </header>

                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                            <input {...register('nome')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            {errors.nome && <span className="text-xs text-red-500">{errors.nome.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input {...register('email')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">CPF</label>
                            <input {...register('cpf')} placeholder="00000000000" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            {errors.cpf && <span className="text-xs text-red-500">{errors.cpf.message}</span>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Telefone</label>
                            <input {...register('telefone')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            {errors.telefone && <span className="text-xs text-red-500">{errors.telefone.message}</span>}
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Endereço</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Logradouro</label>
                                <input {...register('endereco.logradouro')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">CEP</label>
                                <input {...register('endereco.cep')} placeholder="00000000" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Bairro</label>
                                <input {...register('endereco.bairro')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Cidade</label>
                                <input {...register('endereco.cidade')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">UF</label>
                                <input {...register('endereco.uf')} maxLength={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-voll-secondary focus:border-transparent outline-none transition-all" />
                            </div>
                        </div>
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
                            {mutation.isPending ? 'Salvando...' : 'Cadastrar Paciente'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
