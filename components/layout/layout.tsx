import MainHeader from "./main-header";

export default function Layout(props: any) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}
