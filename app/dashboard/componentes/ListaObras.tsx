type Obra = {
    id: string;
    nome: string;
    progresso: number; // 0..100
    status: "em_andamento" | "concluida" | "atrasada";
  };
  
  type Props = {
    obras: Obra[];
    mostrarTodas?: boolean;
    limite?: number;
  };
  
  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'concluida':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'atrasada':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const obterTextoStatus = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return 'Em andamento';
      case 'concluida':
        return 'Concluída';
      case 'atrasada':
        return 'Atrasada';
      default:
        return status;
    }
  };
  
  export default function ListaObras({ obras, mostrarTodas = true, limite = 5 }: Props) {
    const itens = mostrarTodas ? obras : obras.slice(0, limite);
  
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Obras Recentes</h2>
          {!mostrarTodas && obras.length > limite && (
            <span className="text-sm text-gray-500">Mostrando {limite} de {obras.length}</span>
          )}
        </div>
  
        <ul className="space-y-4">
          {itens.map((obra) => {
            const st = obterCorStatus(obra.status);
            return (
              <li key={obra.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{obra.nome}</p>
                    <span className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${st}`}>
                      {obterTextoStatus(obra.status)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{obra.progresso}%</span>
                </div>
  
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${obra.progresso}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {itens.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Nenhuma obra encontrada</p>
            <p className="text-gray-400 text-sm mt-1">Crie sua primeira obra para começar</p>
          </div>
        )}
      </div>
    );
  }
  