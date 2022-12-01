import { useRouter } from "next/router";

export default function BlogPostPage() {
  // /blog/2022/01 로 진입시
  const router = useRouter();
  console.log(router.query); // { slug: ['2022', '1'] }
  return <div>BlogPostPage</div>;
}
