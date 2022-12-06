import path from "path";
import fs from "fs/promises"; // node 핵심 모듈

export default function Home(props: any) {
  const { products } = props;
  return (
    <>
      <ul>
        {products.map((product: any) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData: any = await fs.readFile(filePath);
  const data: any = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
  };
}
