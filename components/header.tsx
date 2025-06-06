import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CloudRain, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CloudRain className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-blue-900">ClimaTempo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Início
          </Link>
          <Link href="/contato" className="text-gray-700 hover:text-blue-600 font-medium">
            Contato
          </Link>
          <Link href="/pesquisa">
            <Button>Pesquisar Cidade</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Início
              </Link>
              <Link href="/contato" className="text-lg font-medium">
                Contato
              </Link>
              <Link href="/pesquisa">
                <Button className="w-full mt-4">Pesquisar Cidade</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
