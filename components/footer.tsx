import Link from "next/link"
import { CloudRain } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CloudRain className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl">ClimaTempo</span>
            </div>
            <p className="text-gray-400">
              Monitoramento meteorológico e alertas de desastres naturais para manter você e sua comunidade seguros.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/pesquisa" className="text-gray-400 hover:text-white">
                  Pesquisar Cidade
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contato@climatempo.com.br</li>
              <li>(11) 9999-9999</li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ClimaTempo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
