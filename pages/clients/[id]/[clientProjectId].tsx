import { useRouter } from "next/router";

export default function ClientProjectId() {
  const router = useRouter();
  return <div>{`${router.query.id}${router.query.clientProjectId}`}</div>;
}
