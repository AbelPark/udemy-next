import path from "path";
import fs from "fs/promises"; // node 핵심 모듈

export default function ProductDetailPage(props: any) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData: any = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find(
    (product: any) => product.id === productId
  );
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } },
    ],
    fallback: "blocking",
  };
}
