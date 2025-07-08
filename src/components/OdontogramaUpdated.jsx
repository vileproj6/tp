import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { 
  Download, 
  Save, 
  FileText, 
  ArrowLeft, 
  Users, 
  User, 
  Heart, 
  Stethoscope, 
  Smile, 
  Activity, 
  Baby, 
  SmilePlus, 
  Apple, 
  Edit3,
  LogOut,
  Calendar,
  Plus,
  Trash2,
  Edit,
  Search
} from 'lucide-react';
import GoogleAuth from './GoogleAuth';
import MapaDentalInfantil from './MapaDentalInfantil';
import PDFExporter from './PDFExporter';
import CampoSimNao from './CampoSimNao';
import HistoricoConsultas from './HistoricoConsultas';

const OdontogramaUpdated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'view'
  const [currentPatient, setCurrentPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const odontogramaRef = useRef(null);

  const [formData, setFormData] = useState({
    nome_crianca: '',
    data_nascimento: '',
    idade: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    cel: '',
    nome_mae: '',
    idade_mae: '',
    profissao_mae: '',
    nome_pai: '',
    idade_pai: '',
    profissao_pai: '',
    motivo_consulta: '',
    alteracao_gestacao: '',
    necessidade_especial: null,
    qual_necessidade: '',
    comprometimento_coordenacao: null,
    qual_coordenacao: '',
    comprometimento_visual: null,
    qual_visual: '',
    comprometimento_comunicacao: null,
    qual_comunicacao: '',
    reacao_contrariado: '',
    reacao_profissionais: '',
    sofreu_cirurgia: null,
    qual_cirurgia: '',
    alteracoes_sanguineas: null,
    problemas_respiratorios: null,
    problemas_hepaticos: null,
    cardiopatias: null,
    problemas_gastricos: null,
    alergias_medicamento: '',
    alergias_alimentar: '',
    alergias_respiratoria: '',
    tratamentos_atuais: '',
    escova_usa: '',
    creme_dental: '',
    anos_primeira_consulta: '',
    tratamento_anterior: '',
    tomou_anestesia: null,
    higiene_bucal: '',
    vezes_dia_higiene: '',
    gengiva_sangra: null,
    extracoes_dentarias: null,
    escova_lingua: null,
    usa_fio_dental: null,
    alimentacao_notas: '',
    fonoaudiologia: null,
    fisioterapia: null,
    psicologia: null,
    psiquiatrico: null,
    psiquiatrico_to: null,
    outro_tratamento: '',
    portador_ist: '',
    mama_peito: null,
    mamou_peito: null,
    ate_quando_mamou: '',
    toma_mamadeira: null,
    tomou_mamadeira: null,
    ate_quando_mamadeira: '',
    engasga_vomita: '',
    chupa_dedo: '',
    chupa_chupeta: '',
    outros_habitos: '',
    range_dentes: '',
    foi_dentista: null,
    qual_dentista: '',
    mapa_dental: [],
    responsavel_nome: '',
    informacoes_verdadeiras: false,
    informacoes_adicionais: '',
    consultas: []
  });

  // Simular dados de pacientes (em produção, viria de uma API)
  useEffect(() => {
    const mockPatients = [
      {
        id: 1,
        nome_crianca: 'João Silva',
        idade: 8,
        data_nascimento: '2015-03-15',
        responsavel_nome: 'Maria Silva',
        created_at: '2024-01-15'
      },
      {
        id: 2,
        nome_crianca: 'Ana Santos',
        idade: 6,
        data_nascimento: '2017-07-22',
        responsavel_nome: 'Carlos Santos',
        created_at: '2024-01-10'
      }
    ];
    setPatients(mockPatients);
  }, []);

  const resetForm = () => {
    setFormData({
      nome_crianca: '',
      data_nascimento: '',
      idade: '',
      endereco: '',
      bairro: '',
      cep: '',
      cidade: '',
      cel: '',
      nome_mae: '',
      idade_mae: '',
      profissao_mae: '',
      nome_pai: '',
      idade_pai: '',
      profissao_pai: '',
      motivo_consulta: '',
      alteracao_gestacao: '',
      necessidade_especial: null,
      qual_necessidade: '',
      comprometimento_coordenacao: null,
      qual_coordenacao: '',
      comprometimento_visual: null,
      qual_visual: '',
      comprometimento_comunicacao: null,
      qual_comunicacao: '',
      reacao_contrariado: '',
      reacao_profissionais: '',
      sofreu_cirurgia: null,
      qual_cirurgia: '',
      alteracoes_sanguineas: null,
      problemas_respiratorios: null,
      problemas_hepaticos: null,
      cardiopatias: null,
      problemas_gastricos: null,
      alergias_medicamento: '',
      alergias_alimentar: '',
      alergias_respiratoria: '',
      tratamentos_atuais: '',
      escova_usa: '',
      creme_dental: '',
      anos_primeira_consulta: '',
      tratamento_anterior: '',
      tomou_anestesia: null,
      higiene_bucal: '',
      vezes_dia_higiene: '',
      gengiva_sangra: null,
      extracoes_dentarias: null,
      escova_lingua: null,
      usa_fio_dental: null,
      alimentacao_notas: '',
      fonoaudiologia: null,
      fisioterapia: null,
      psicologia: null,
      psiquiatrico: null,
      psiquiatrico_to: null,
      outro_tratamento: '',
      portador_ist: '',
      mama_peito: null,
      mamou_peito: null,
      ate_quando_mamou: '',
      toma_mamadeira: null,
      tomou_mamadeira: null,
      ate_quando_mamadeira: '',
      engasga_vomita: '',
      chupa_dedo: '',
      chupa_chupeta: '',
      outros_habitos: '',
      range_dentes: '',
      foi_dentista: null,
      qual_dentista: '',
      mapa_dental: [],
      responsavel_nome: '',
      informacoes_verdadeiras: false,
      informacoes_adicionais: '',
      consultas: []
    });
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('list');
    setCurrentPatient(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewPatient = () => {
    resetForm();
    setCurrentPatient(null);
    setCurrentView('form');
  };

  const handleSelectPatient = (patient) => {
    setCurrentPatient(patient);
    // Em produção, carregaria os dados completos do paciente
    setFormData({
      ...formData,
      nome_crianca: patient.nome_crianca,
      idade: patient.idade,
      data_nascimento: patient.data_nascimento,
      responsavel_nome: patient.responsavel_nome
    });
    setCurrentView('view');
  };

  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setFormData({
      ...formData,
      nome_crianca: patient.nome_crianca,
      idade: patient.idade,
      data_nascimento: patient.data_nascimento,
      responsavel_nome: patient.responsavel_nome
    });
    setCurrentView('form');
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      setPatients(prev => prev.filter(p => p.id !== patientId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome_crianca.trim()) {
      alert('Nome da criança é obrigatório');
      return;
    }

    if (!formData.responsavel_nome.trim()) {
      alert('Nome do responsável é obrigatório');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular salvamento (em produção, enviaria para API)
      const newPatient = {
        id: currentPatient?.id || Date.now(),
        nome_crianca: formData.nome_crianca,
        idade: formData.idade,
        data_nascimento: formData.data_nascimento,
        responsavel_nome: formData.responsavel_nome,
        created_at: currentPatient?.created_at || new Date().toISOString()
      };

      if (currentPatient) {
        setPatients(prev => prev.map(p => p.id === currentPatient.id ? newPatient : p));
      } else {
        setPatients(prev => [...prev, newPatient]);
      }

      alert('Ficha salva com sucesso!');
      setCurrentView('list');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar a ficha');
    }

    setIsSubmitting(false);
  };

  const handleExportPDF = () => {
    PDFExporter.generatePDF(formData, odontogramaRef);
  };

  const handleAddConsulta = (consulta) => {
    setFormData(prev => ({
      ...prev,
      consultas: [...prev.consultas, consulta]
    }));
  };

  const filteredPatients = patients.filter(patient =>
    patient.nome_crianca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.responsavel_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return <GoogleAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: 'url(/src/assets/bg.png)'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-700/80 to-cyan-800/80"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Header */}
      <header className="glass-card rounded-none border-x-0 border-t-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <img 
                  src="/assets/logo.png" 
                  alt="Tio Paulo Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tio Paulo</h1>
                <p className="text-emerald-100 text-sm">Ficha de Anamnese</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <img 
                  src={user?.picture} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="glass-button p-2 rounded-lg text-white hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 py-8">
        {currentView === 'list' && (
          <div className="max-w-6xl mx-auto">
            {/* Lista de Pacientes */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Pacientes</h2>
                <p className="text-emerald-100">Gerencie as fichas de anamnese</p>
              </div>
              <button
                onClick={handleNewPatient}
                className="glass-button px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2 hover:bg-emerald-500/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Nova Ficha</span>
              </button>
            </div>

            {/* Busca */}
            <div className="glass-card rounded-2xl p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nome da criança ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-3 text-white placeholder-white/60"
                />
              </div>
            </div>

            {/* Lista */}
            <div className="space-y-4">
              {filteredPatients.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <Users className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white text-lg">
                    {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhuma ficha cadastrada'}
                  </p>
                  <p className="text-emerald-100 mt-2">
                    {!searchTerm && 'Clique em "Nova Ficha" para começar'}
                  </p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div key={patient.id} className="glass-card rounded-2xl p-6 hover:bg-white/15 transition-all">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {patient.nome_crianca}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-emerald-200">Idade:</span>
                            <span className="text-white ml-2">{patient.idade} anos</span>
                          </div>
                          <div>
                            <span className="text-emerald-200">Responsável:</span>
                            <span className="text-white ml-2">{patient.responsavel_nome}</span>
                          </div>
                          <div>
                            <span className="text-emerald-200">Cadastrado em:</span>
                            <span className="text-white ml-2">
                              {new Date(patient.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPatient(patient);
                          }}
                          className="glass-button p-2 rounded-lg text-white hover:bg-blue-500/30 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePatient(patient.id);
                          }}
                          className="glass-button p-2 rounded-lg text-white hover:bg-red-500/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'view' && currentPatient && (
          <div className="max-w-4xl mx-auto">
            {/* Header da visualização */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className="glass-button p-3 rounded-lg text-white hover:bg-emerald-500/30 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Visualizar Ficha</h1>
                  <p className="text-emerald-100">{currentPatient.nome_crianca}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleExportPDF}
                  className="glass-button px-4 py-2 rounded-lg text-white hover:bg-blue-500/30 transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar PDF</span>
                </button>
                <button
                  onClick={() => handleEditPatient(currentPatient)}
                  className="glass-button px-4 py-2 rounded-lg text-white hover:bg-emerald-500/30 transition-all flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              </div>
            </div>

            {/* Conteúdo da visualização */}
            <div ref={odontogramaRef} className="space-y-8">
              {/* Dados Pessoais */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <User className="w-6 h-6 text-emerald-300" />
                    <span>Dados Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                  <div>
                    <Label className="text-emerald-200">Nome da Criança</Label>
                    <p className="text-white">{formData.nome_crianca || 'Não informado'}</p>
                  </div>
                  <div>
                    <Label className="text-emerald-200">Data de Nascimento</Label>
                    <p className="text-white">{formData.data_nascimento || 'Não informado'}</p>
                  </div>
                  <div>
                    <Label className="text-emerald-200">Idade</Label>
                    <p className="text-white">{formData.idade || 'Não informado'}</p>
                  </div>
                  <div>
                    <Label className="text-emerald-200">Responsável</Label>
                    <p className="text-white">{formData.responsavel_nome || 'Não informado'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Mapa Dental */}
              <MapaDentalInfantil 
                selectedTeeth={formData.mapa_dental}
                onTeethChange={() => {}} // Readonly na visualização
              />
            </div>
          </div>
        )}

        {currentView === 'form' && (
          <div className="max-w-4xl mx-auto">
            {/* Header do formulário */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className="glass-button p-3 rounded-lg text-white hover:bg-emerald-500/30 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {currentPatient ? 'Editar Ficha' : 'Nova Ficha'}
                  </h1>
                  <p className="text-emerald-100">
                    {currentPatient ? currentPatient.nome_crianca : 'Preencha os dados do paciente'}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <User className="w-6 h-6 text-emerald-300" />
                    <span>Dados Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Nome da Criança *
                      </Label>
                      <Input
                        type="text"
                        required
                        value={formData.nome_crianca}
                        onChange={(e) => handleInputChange("nome_crianca", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Data de Nascimento *
                      </Label>
                      <Input
                        type="date"
                        required
                        value={formData.data_nascimento}
                        onChange={(e) => handleInputChange("data_nascimento", e.target.value)}
                        className="glass-input text-white"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Idade
                      </Label>
                      <Input
                        type="number"
                        value={formData.idade}
                        onChange={(e) => handleInputChange("idade", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Celular
                      </Label>
                      <Input
                        type="tel"
                        value={formData.cel}
                        onChange={(e) => handleInputChange("cel", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Endereço
                    </Label>
                    <Input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange("endereco", e.target.value)}
                      className="glass-input text-white placeholder-white/60"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Bairro
                      </Label>
                      <Input
                        type="text"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange("bairro", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        CEP
                      </Label>
                      <Input
                        type="text"
                        value={formData.cep}
                        onChange={(e) => handleInputChange("cep", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Cidade
                      </Label>
                      <Input
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange("cidade", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados dos Pais */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Dados dos Pais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-emerald-300">Mãe</h3>
                      <div>
                        <Label className="text-white font-medium text-sm mb-2 block">
                          Nome da Mãe
                        </Label>
                        <Input
                          type="text"
                          value={formData.nome_mae}
                          onChange={(e) => handleInputChange("nome_mae", e.target.value)}
                          className="glass-input text-white placeholder-white/60"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white font-medium text-sm mb-2 block">
                            Idade
                          </Label>
                          <Input
                            type="number"
                            value={formData.idade_mae}
                            onChange={(e) => handleInputChange("idade_mae", e.target.value)}
                            className="glass-input text-white placeholder-white/60"
                          />
                        </div>
                        <div>
                          <Label className="text-white font-medium text-sm mb-2 block">
                            Profissão
                          </Label>
                          <Input
                            type="text"
                            value={formData.profissao_mae}
                            onChange={(e) => handleInputChange("profissao_mae", e.target.value)}
                            className="glass-input text-white placeholder-white/60"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-emerald-300">Pai</h3>
                      <div>
                        <Label className="text-white font-medium text-sm mb-2 block">
                          Nome do Pai
                        </Label>
                        <Input
                          type="text"
                          value={formData.nome_pai}
                          onChange={(e) => handleInputChange("nome_pai", e.target.value)}
                          className="glass-input text-white placeholder-white/60"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white font-medium text-sm mb-2 block">
                            Idade
                          </Label>
                          <Input
                            type="number"
                            value={formData.idade_pai}
                            onChange={(e) => handleInputChange("idade_pai", e.target.value)}
                            className="glass-input text-white placeholder-white/60"
                          />
                        </div>
                        <div>
                          <Label className="text-white font-medium text-sm mb-2 block">
                            Profissão
                          </Label>
                          <Input
                            type="text"
                            value={formData.profissao_pai}
                            onChange={(e) => handleInputChange("profissao_pai", e.target.value)}
                            className="glass-input text-white placeholder-white/60"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Motivo da Consulta */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Edit3 className="w-6 h-6 text-emerald-300" />
                    <span>Motivo da Consulta</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Qual o motivo da consulta?
                    </Label>
                    <Textarea
                      value={formData.motivo_consulta}
                      onChange={(e) => handleInputChange("motivo_consulta", e.target.value)}
                      className="glass-input text-white placeholder-white/60 h-24 resize-none"
                      placeholder="Descreva o motivo da consulta..."
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Mãe teve alguma alteração durante a gestação?
                    </Label>
                    <Textarea
                      value={formData.alteracao_gestacao}
                      onChange={(e) => handleInputChange("alteracao_gestacao", e.target.value)}
                      className="glass-input text-white placeholder-white/60 h-24 resize-none"
                      placeholder="Descreva as alterações..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Necessidades Especiais */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Heart className="w-6 h-6 text-emerald-300" />
                    <span>Necessidades Especiais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <CampoSimNao
                      label="Possui necessidade especial?"
                      value={formData.necessidade_especial}
                      onChange={(value) => handleInputChange("necessidade_especial", value)}
                      textField="Qual?"
                      textValue={formData.qual_necessidade}
                      onTextChange={(value) => handleInputChange("qual_necessidade", value)}
                    />
                    
                    <CampoSimNao
                      label="Possui comprometimento de coordenação motora?"
                      value={formData.comprometimento_coordenacao}
                      onChange={(value) => handleInputChange("comprometimento_coordenacao", value)}
                      textField="Qual?"
                      textValue={formData.qual_coordenacao}
                      onTextChange={(value) => handleInputChange("qual_coordenacao", value)}
                    />
                    
                    <CampoSimNao
                      label="Possui comprometimento visual?"
                      value={formData.comprometimento_visual}
                      onChange={(value) => handleInputChange("comprometimento_visual", value)}
                      textField="Qual?"
                      textValue={formData.qual_visual}
                      onTextChange={(value) => handleInputChange("qual_visual", value)}
                    />
                    
                    <CampoSimNao
                      label="Possui comprometimento de comunicação?"
                      value={formData.comprometimento_comunicacao}
                      onChange={(value) => handleInputChange("comprometimento_comunicacao", value)}
                      textField="Qual?"
                      textValue={formData.qual_comunicacao}
                      onTextChange={(value) => handleInputChange("qual_comunicacao", value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Como o paciente reage quando é contrariado?
                      </Label>
                      <Textarea
                        value={formData.reacao_contrariado}
                        onChange={(e) => handleInputChange("reacao_contrariado", e.target.value)}
                        className="glass-input text-white placeholder-white/60 h-20 resize-none"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Como o paciente reage diante de profissionais da saúde?
                      </Label>
                      <Textarea
                        value={formData.reacao_profissionais}
                        onChange={(e) => handleInputChange("reacao_profissionais", e.target.value)}
                        className="glass-input text-white placeholder-white/60 h-20 resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico Médico */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Stethoscope className="w-6 h-6 text-emerald-300" />
                    <span>Histórico Médico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <CampoSimNao
                      label="Sofreu alguma cirurgia?"
                      value={formData.sofreu_cirurgia}
                      onChange={(value) => handleInputChange("sofreu_cirurgia", value)}
                      textField="Qual?"
                      textValue={formData.qual_cirurgia}
                      onTextChange={(value) => handleInputChange("qual_cirurgia", value)}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CampoSimNao
                        label="Alterações sanguíneas?"
                        value={formData.alteracoes_sanguineas}
                        onChange={(value) => handleInputChange("alteracoes_sanguineas", value)}
                      />
                      
                      <CampoSimNao
                        label="Problemas respiratórios?"
                        value={formData.problemas_respiratorios}
                        onChange={(value) => handleInputChange("problemas_respiratorios", value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CampoSimNao
                        label="Problemas hepáticos?"
                        value={formData.problemas_hepaticos}
                        onChange={(value) => handleInputChange("problemas_hepaticos", value)}
                      />
                      
                      <CampoSimNao
                        label="Cardiopatias?"
                        value={formData.cardiopatias}
                        onChange={(value) => handleInputChange("cardiopatias", value)}
                      />
                    </div>
                    
                    <CampoSimNao
                      label="Problemas gástricos?"
                      value={formData.problemas_gastricos}
                      onChange={(value) => handleInputChange("problemas_gastricos", value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Alergias a medicamentos
                      </Label>
                      <Input
                        type="text"
                        value={formData.alergias_medicamento}
                        onChange={(e) => handleInputChange("alergias_medicamento", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Alergias alimentares
                      </Label>
                      <Input
                        type="text"
                        value={formData.alergias_alimentar}
                        onChange={(e) => handleInputChange("alergias_alimentar", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Alergias respiratórias
                      </Label>
                      <Input
                        type="text"
                        value={formData.alergias_respiratoria}
                        onChange={(e) => handleInputChange("alergias_respiratoria", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Tratamentos atuais
                    </Label>
                    <Textarea
                      value={formData.tratamentos_atuais}
                      onChange={(e) => handleInputChange("tratamentos_atuais", e.target.value)}
                      className="glass-input text-white placeholder-white/60 h-20 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Acompanhamentos */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Activity className="w-6 h-6 text-emerald-300" />
                    <span>Acompanhamentos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <CampoSimNao
                      label="Fonoaudiologia?"
                      value={formData.fonoaudiologia}
                      onChange={(value) => handleInputChange("fonoaudiologia", value)}
                    />
                    <CampoSimNao
                      label="Fisioterapia?"
                      value={formData.fisioterapia}
                      onChange={(value) => handleInputChange("fisioterapia", value)}
                    />
                    <CampoSimNao
                      label="Psicologia?"
                      value={formData.psicologia}
                      onChange={(value) => handleInputChange("psicologia", value)}
                    />
                    <div className="flex items-center space-x-4">
                      <CampoSimNao
                        label="Psiquiátrico?"
                        value={formData.psiquiatrico}
                        onChange={(value) => handleInputChange("psiquiatrico", value)}
                      />
                      <CampoSimNao
                        label="TO?"
                        value={formData.psiquiatrico_to}
                        onChange={(value) => handleInputChange("psiquiatrico_to", value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Outro tratamento?
                    </Label>
                    <Input
                      type="text"
                      value={formData.outro_tratamento}
                      onChange={(e) => handleInputChange("outro_tratamento", e.target.value)}
                      className="glass-input text-white placeholder-white/60"
                    />
                  </div>
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      É portador de alguma IST?
                    </Label>
                    <Input
                      type="text"
                      value={formData.portador_ist}
                      onChange={(e) => handleInputChange("portador_ist", e.target.value)}
                      className="glass-input text-white placeholder-white/60"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Hábitos */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Baby className="w-6 h-6 text-emerald-300" />
                    <span>Hábitos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <CampoSimNao
                      label="Paciente mama no peito?"
                      value={formData.mama_peito}
                      onChange={(value) => handleInputChange("mama_peito", value)}
                    />
                    <CampoSimNao
                      label="Já mamou no peito?"
                      value={formData.mamou_peito}
                      onChange={(value) => handleInputChange("mamou_peito", value)}
                      textField="Até quando?"
                      textValue={formData.ate_quando_mamou}
                      onTextChange={(value) => handleInputChange("ate_quando_mamou", value)}
                    />
                    <CampoSimNao
                      label="Paciente toma mamadeira?"
                      value={formData.toma_mamadeira}
                      onChange={(value) => handleInputChange("toma_mamadeira", value)}
                    />
                    <CampoSimNao
                      label="Já tomou mamadeira?"
                      value={formData.tomou_mamadeira}
                      onChange={(value) => handleInputChange("tomou_mamadeira", value)}
                      textField="Até quando?"
                      textValue={formData.ate_quando_mamadeira}
                      onTextChange={(value) => handleInputChange("ate_quando_mamadeira", value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Engasga ou vomita com facilidade?</Label>
                      <Input type="text" value={formData.engasga_vomita} onChange={(e) => handleInputChange("engasga_vomita", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Chupa o dedo?</Label>
                      <Input type="text" value={formData.chupa_dedo} onChange={(e) => handleInputChange("chupa_dedo", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Chupa chupeta?</Label>
                      <Input type="text" value={formData.chupa_chupeta} onChange={(e) => handleInputChange("chupa_chupeta", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Possui outros hábitos?</Label>
                      <Input type="text" value={formData.outros_habitos} onChange={(e) => handleInputChange("outros_habitos", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Range os dentes?</Label>
                      <Input type="text" value={formData.range_dentes} onChange={(e) => handleInputChange("range_dentes", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico Odontológico */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <SmilePlus className="w-6 h-6 text-emerald-300" />
                    <span>Histórico Odontológico</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Quantos anos na primeira consulta?</Label>
                      <Input type="number" value={formData.anos_primeira_consulta} onChange={(e) => handleInputChange("anos_primeira_consulta", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">Como foi o tratamento anterior?</Label>
                      <Input type="text" value={formData.tratamento_anterior} onChange={(e) => handleInputChange("tratamento_anterior", e.target.value)} className="glass-input text-white placeholder-white/60"/>
                    </div>
                  </div>
                  <CampoSimNao
                    label="Já foi ao dentista?"
                    value={formData.foi_dentista}
                    onChange={(value) => handleInputChange("foi_dentista", value)}
                    textField="Qual?"
                    textValue={formData.qual_dentista}
                    onTextChange={(value) => handleInputChange("qual_dentista", value)}
                  />
                </CardContent>
              </Card>

              {/* Higiene Bucal */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Smile className="w-6 h-6 text-emerald-300" />
                    <span>Higiene Bucal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Qual escova usa?
                      </Label>
                      <Input
                        type="text"
                        value={formData.escova_usa}
                        onChange={(e) => handleInputChange("escova_usa", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Qual creme dental usa?
                      </Label>
                      <Input
                        type="text"
                        value={formData.creme_dental}
                        onChange={(e) => handleInputChange("creme_dental", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Quem faz a higiene bucal?
                      </Label>
                      <Input
                        type="text"
                        value={formData.higiene_bucal}
                        onChange={(e) => handleInputChange("higiene_bucal", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <Label className="text-white font-medium text-sm mb-2 block">
                        Quantas vezes ao dia?
                      </Label>
                      <Input
                        type="number"
                        value={formData.vezes_dia_higiene}
                        onChange={(e) => handleInputChange("vezes_dia_higiene", e.target.value)}
                        className="glass-input text-white placeholder-white/60"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <CampoSimNao
                      label="Já tomou anestesia?"
                      value={formData.tomou_anestesia}
                      onChange={(value) => handleInputChange("tomou_anestesia", value)}
                    />
                    
                    <CampoSimNao
                      label="Gengiva sangra com facilidade?"
                      value={formData.gengiva_sangra}
                      onChange={(value) => handleInputChange("gengiva_sangra", value)}
                    />
                    
                    <CampoSimNao
                      label="Já realizou extrações dentárias?"
                      value={formData.extracoes_dentarias}
                      onChange={(value) => handleInputChange("extracoes_dentarias", value)}
                    />
                    
                    <CampoSimNao
                      label="Escova a língua?"
                      value={formData.escova_lingua}
                      onChange={(value) => handleInputChange("escova_lingua", value)}
                    />
                    
                    <CampoSimNao
                      label="Usa fio dental?"
                      value={formData.usa_fio_dental}
                      onChange={(value) => handleInputChange("usa_fio_dental", value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Alimentação e Outras Informações */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Apple className="w-6 h-6 text-emerald-300" />
                    <span>Alimentação e Outras Informações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Vamos falar sobre a alimentação do paciente:
                    </Label>
                    <Textarea
                      value={formData.alimentacao_notas}
                      onChange={(e) => handleInputChange("alimentacao_notas", e.target.value)}
                      className="glass-input text-white placeholder-white/60 h-24 resize-none"
                    />
                  </div>
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Alguma informação adicional não relatada?
                    </Label>
                    <Textarea
                      value={formData.informacoes_adicionais}
                      onChange={(e) => handleInputChange("informacoes_adicionais", e.target.value)}
                      className="glass-input text-white placeholder-white/60 h-24 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Mapa Dental */}
              <MapaDentalInfantil 
                selectedTeeth={formData.mapa_dental}
                onTeethChange={(teeth) => handleInputChange("mapa_dental", teeth)}
              />

              {/* Histórico de Consultas */}
              <HistoricoConsultas 
                consultas={formData.consultas}
                onAddConsulta={handleAddConsulta}
              />

              {/* Responsável */}
              <Card className="glass-card rounded-2xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Responsável</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-white font-medium text-sm mb-2 block">
                      Nome do Responsável *
                    </Label>
                    <Input
                      type="text"
                      required
                      value={formData.responsavel_nome}
                      onChange={(e) => handleInputChange("responsavel_nome", e.target.value)}
                      className="glass-input text-white placeholder-white/60"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="informacoes_verdadeiras"
                      checked={formData.informacoes_verdadeiras}
                      onChange={(e) => handleInputChange("informacoes_verdadeiras", e.target.checked)}
                      className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30 rounded focus:ring-emerald-500"
                    />
                    <Label htmlFor="informacoes_verdadeiras" className="text-white text-sm">
                      Declaro que todas as informações prestadas são verdadeiras
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  onClick={() => setCurrentView('list')}
                  className="glass-button px-6 py-3 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-button px-8 py-3 text-white font-semibold flex items-center space-x-2 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{isSubmitting ? "Salvando..." : "Salvar Ficha"}</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default OdontogramaUpdated;