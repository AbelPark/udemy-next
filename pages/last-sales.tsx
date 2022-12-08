import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function LastSalesPage() {
  const [sales, setSales]: any[] = useState([]);
  const request = async () => {
    const res = await axios.get(
      "https://udemy-next-63ab5-default-rtdb.firebaseio.com/sales.json"
    );
    return res.data;
  };
  const { isLoading, isError, data, error } = useQuery<any, Error>(
    ["todos"],
    request
  );

  useEffect(() => {
    const transformedSales: any[] = [];
    for (const key in data) {
      transformedSales.push({
        id: key,
        userName: data[key].userName,
        volume: data[key].volume,
      });
    }
    setSales(transformedSales);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {sales.map((sale: any) => (
          <li key={sale.id}>
            {sale.userName} - $ {sale.volume}
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {}
