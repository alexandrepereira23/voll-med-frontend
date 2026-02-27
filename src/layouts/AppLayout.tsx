import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserRound, CalendarCheck, Stethoscope } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/medicos', label: 'Médicos', icon: Stethoscope },
    { path: '/pacientes', label: 'Pacientes', icon: UserRound },
    { path: '/consultas', label: 'Consultas', icon: CalendarCheck },
];

export function AppLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-voll-primary text-white flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg">
                        <Stethoscope className="text-voll-primary w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Voll.med</h1>
                </div>

                <nav className="flex-1 px-4 mt-6">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors overflow-hidden",
                                        location.pathname === item.path
                                            ? "bg-white/10 text-white font-medium"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-6 border-t border-white/10 text-xs text-white/50">
                    © 2026 Voll.med - Gestão Médica
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h2 className="text-sm font-medium text-gray-500">
                        {menuItems.find(i => i.path === location.pathname)?.label || 'Voll.med'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-700">Administrador</span>
                            <span className="text-xs text-gray-400">admin@voll.med</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-voll-secondary flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
