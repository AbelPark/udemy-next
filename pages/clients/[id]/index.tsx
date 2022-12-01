import { useRouter } from "next/router";

export default function IdPage() {
  const router = useRouter();

  function loadProductHandler() {
    // ... load data
    router.push(`/clients/${router.query.id}/projectA`);
  }

  return (
    <>
      <div>{`IdPage${router.query.id}`}</div>
      <button onClick={loadProductHandler}>클릭하세유</button>
    </>
  );
}
