import { useContext, useEffect } from "react";
import ApiContext from "../component/api-context";

export default function HomeView() {
  const { apiClient } = useContext(ApiContext);
  useEffect(() => {
    async function load() {
      await apiClient.getEvents();
    }
    load();
  }, [apiClient]);
  return <h1>Hello, world!</h1>;
}
