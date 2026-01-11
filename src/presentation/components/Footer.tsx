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
            <a href="https://www.facebook.com/temvagaai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/temvagaai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="mailto:contato@temvagaai.com.br" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
