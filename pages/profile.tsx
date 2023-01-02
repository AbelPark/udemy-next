import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return (
    <>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req: req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
