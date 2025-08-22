"use client";

interface Usuario {
  nome: string;
  empresa: string;
  email: string;
  plano: string;
}

interface PropsInformacoesConta {
  usuario: Usuario;
}

export default function InformacoesConta({ usuario }: PropsInformacoesConta) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Sua Conta</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Plano:</span>
          <span className="text-gold font-bold">{usuario.plano}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Empresa:</span>
          <span className="text-gray-900 font-medium">{usuario.empresa}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">E-mail:</span>
          <span className="text-gray-900 font-medium">{usuario.email}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600 font-medium">Nome:</span>
          <span className="text-gray-900 font-medium">{usuario.nome}</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <span className="text-gray-700 font-medium">Status da conta:</span>
          <span className="text-green-600 font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Ativa
          </span>
        </div>
      </div>
    </div>
  );
}
