import { useRouter } from "next/router";

export default function Promotion() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Promotion: {id}</p>;
}