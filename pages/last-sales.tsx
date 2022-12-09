import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

const request = async () => {
  const res = await axios.get(
    "https://udemy-next-63ab5-default-rtdb.firebaseio.com/sales.json"
  );
  return res.data;
};

export default function LastSalesPage() {
  // 사전 렌더링하는 쿼리 queryKey queryKey 값을 pre-fetch 함수에 잇는 키와 일치 시키면 된다
  const preFetchData = useQuery({
    queryKey: ["sales"],
    queryFn: request,
  });
  // 클라이언트 페치 쿼리
  const clientFetchData = useQuery({
    queryKey: ["sales-2"],
    queryFn: request,
  });

  const [sales, setSales]: any[] = useState([]);

  useEffect(() => {
    const transformedSales: any[] = [];
    for (const key in preFetchData.data) {
      transformedSales.push({
        id: key,
        userName: preFetchData.data[key].userName,
        volume: preFetchData.data[key].volume,
      });
    }
    setSales(transformedSales);
  }, [preFetchData.data]);

  // if (preFetchData.data.isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (sales.length === 0) {
  //   return <p>데이터 변환 전임...</p>;
  // }

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

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["sales"], request);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}
