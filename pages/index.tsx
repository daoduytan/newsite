import { useTestStore } from "../store/test.store";

export default function Home() {
  const { loading } = useTestStore();
  console.log({ loading });

  return <div>dasd{loading}</div>;
}
