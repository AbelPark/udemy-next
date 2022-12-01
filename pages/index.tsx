import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <ul>
        <li>
          <Link replace href="/blog/21/11">
            페이지 이동
          </Link>
        </li>
      </ul>
    </>
  );
}
