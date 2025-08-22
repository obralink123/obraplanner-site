"use client";

interface Acao {
  id: string;
  titulo: string;
  icone: React.ReactNode;
  cor: 'dourado' | 'azul' | 'verde' | 'roxo' | 'vermelho';
  onClick?: () => void;
}

interface PropsBotoesAcao {
  acoes: Acao[];
  titulo?: string;
}

export default function BotoesAcao({ acoes, titulo = "Ações Rápidas" }: PropsBotoesAcao) {
  const obterCorBotao = (cor: string) => {
    switch (cor) {
      case 'dourado':
        return 'bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-black shadow-lg hover:shadow-xl';
      case 'azul':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl';
      case 'verde':
        return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl';
      case 'roxo':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl';
      case 'vermelho':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {titulo && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">{titulo}</h3>
      )}
      <div className="space-y-4">
        {acoes.map((acao) => (
          <button
            key={acao.id}
            onClick={acao.onClick}
            className={`w-full ${obterCorBotao(acao.cor)} font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            {acao.icone}
            {acao.titulo}
          </button>
        ))}
      </div>
    </div>
  );
}
