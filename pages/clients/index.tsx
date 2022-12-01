import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "Park", name: "hm" },
    { id: "kim", name: "eh" },
  ];
  return (
    <>
      <div>ClientsPage</div>
      <ul>
        {clients.map((clients, idx) => {
          return (
            <li key={idx}>
              {/* <Link href={`/clients/${clients.id}`}>{clients.name}</Link> */}
              <Link
                href={{ pathname: "/clients/[id]", query: { id: clients.id } }}
              >
                {clients.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
