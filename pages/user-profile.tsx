export default function UserProfilePage(props: any) {
  return <h1>{props.userName}</h1>;
}

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  return {
    props: {
      userName: "Max",
    },
  };
}
