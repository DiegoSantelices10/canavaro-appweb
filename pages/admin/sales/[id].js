import { useRouter } from "next/router";

export default function Sale() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Sale: {id}</p>;
}