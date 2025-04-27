import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import Product from "@/types/Product";

export default function ProductList() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:3000/product?name=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data);
      });
  }, [search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRemove = (id: string) => {
    fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`http://localhost:3000/product?name=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredProducts(data);
        });
    });
  };

  function renderCategories(categories: { id: string; name: string }[]) {
    return categories.map((category) => (
      <span
        key={category.id}
        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-3.5 py-1.5 rounded-2xl"
      >
        {category.name}
      </span>
    ));
  }

  return (
    <main className="p-10 bg-gray-100 min-h-screen relative">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold  z-2">Listagem de Produtos</h1>
        <div className="flex flex-col items-center sm:flex-row gap-10 mt-8 sm:mt-0  z-2">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Filtrar por nome"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <Link to="/product/0">
            <Button>Adicionar Produto</Button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {filteredProducts.length === 0 ? (
          <motion.p
            key="no-products-message"
            className="text-center text-gray-500 absolute inset-0 flex items-center justify-center z-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nenhum produto encontrado.
          </motion.p>
        ) : (
          <motion.div
            key="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg gap-2"
              >
                <img
                  src={product.photo}
                  alt={product.name}
                  className="justify-self-center h-48 object-contain rounded-md mt-4 mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <div className="text-gray-500">
                  {renderCategories(product.categories)}
                </div>

                <p className="text-gray-500 mt-6">Quantidade: {product.qty}</p>
                <p className="text-gray-500">
                  Preço: R$ {product.price.toFixed(2)}
                </p>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="mt-4 w-full">
                      Opções
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="link">Editar</Button>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRemove(product.id)}
                      className="text-red-600"
                    >
                      <Button variant="link">Deletar</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
