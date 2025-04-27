import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Importando o componente Checkbox do shadcn UI
import Product from "@/types/Product";
import Category from "@/types/Category";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    qty: 0,
    price: 0,
    photo: "",
    categories: [
      {
        id: "cat4",
        name: "Acessórios",
      },
    ],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buscar produto se id for diferente de '0' para edição
  useEffect(() => {
    if (id !== "0") {
      fetch(`http://localhost:3000/product/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
          console.log(data);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  // Buscar categorias disponíveis
  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // Função para lidar com a alteração do formulário
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevState: Product) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com a alteração das categorias selecionadas
  const handleCategoryChange = (categoryId: string, categoryName: string) => {
    setProduct((prevState: Product) => {
      const categories = prevState.categories.some(
        (category) => category.id === categoryId
      )
        ? prevState.categories.filter((category) => category.id !== categoryId)
        : [...prevState.categories, { id: categoryId, name: categoryName }];
      return { ...prevState, categories };
    });
  };

  // Enviar dados do formulário para a API
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const method = id === "0" ? "POST" : "PATCH";
    const endpoint =
      id === "0"
        ? "http://localhost:3000/product"
        : `http://localhost:3000/product/${id}`;
    const { name, photo, price, qty } = product;
    const requestData = {
      name,
      photo,
      price,
      qty,
    };

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...requestData,
        categories: product.categories.map((category) => category.id),
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/product`);
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
        setIsSubmitting(false);
      });
  };

  // Exibir a tela de carregamento enquanto está buscando os dados
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">
          {id === "0" ? "Adicionar Produto" : "Editar Produto"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {(["name", "qty", "price", "photo"] as (keyof Product)[]).map(
            (field) => (
              <div key={field}>
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <Input
                  id={field}
                  name={field}
                  type={
                    field === "price" || field === "qty" ? "number" : "text"
                  }
                  value={
                    typeof product[field] === "object"
                      ? JSON.stringify(product[field])
                      : product[field]
                  } // Verifique o tipo e converta se necessário
                  onChange={handleChange}
                  required
                  step={field === "price" ? "0.01" : undefined}
                />
              </div>
            )
          )}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="categories"
            >
              Categorias
            </label>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={product.categories.some(
                      (cat) => cat.id === category.id
                    )}
                    onCheckedChange={() =>
                      handleCategoryChange(category.id, category.name)
                    }
                  />

                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-between w-full">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
