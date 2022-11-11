import Link from "next/link";

function Copyright() {
  return (
    <div>
      {"Copyright © "}
      <Link href="/">TipXMR</Link> {new Date().getFullYear()}
      {""}
    </div>
  );
}

export default Copyright;
