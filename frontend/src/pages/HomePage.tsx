import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Gerenciador de Produtos
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Um aplicativo de listagem de produtos desenvolvido como um teste
          técnico para a Coder Lab.
        </p>
        <nav>
          <Button
            className="px-6 py-3 hover:bg-primary/80 transition-all"
            asChild
          >
            <Link to="/product">Listagem de Produtos</Link>
          </Button>
        </nav>
      </div>
    </main>
  );
}
