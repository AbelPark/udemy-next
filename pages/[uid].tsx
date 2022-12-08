export default function UserIdPage(props: any) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
