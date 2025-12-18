import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#61452a] text-white py-12 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo tem vaga ai.png" alt="Logo" className="h-10" />
            <span className="font-bold text-lg">Tem Vaga Aí?</span>
          </div>
          <p className="text-sm text-gray-200">O portal que conecta estudantes universitários de Quixadá a vagas em repúblicas, apartamentos e casas compartilhadas.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" fill="white"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Links Úteis</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">Encontrar Vagas</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Anunciar Vaga</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Como Funciona</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contato</h4>
          <ul className="text-sm space-y-2">
            <li><a href="mailto:contato@temvagaai.com.br" className="hover:text-gray-200 transition">contato@temvagaai.com.br</a></li>
            <li className="hover:text-gray-200 transition">(88) 99999-9999</li>
            <li className="hover:text-gray-200 transition">Quixadá - CE</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-200 transition">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-gray-200 transition">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/20 mt-8 pt-8 text-center text-sm">
        <p>© 2025 Tem Vaga Aí? Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
