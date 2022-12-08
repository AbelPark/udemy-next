import path from "path";
import fs from "fs/promises"; // node 핵심 모듈
import Link from "next/link";

export default function Home(props: any) {
  const { products } = props;
  return (
    <>
      <ul>
        {products.map((product: any) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  console.log("Re-generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData: any = await fs.readFile(filePath);
  const data: any = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
