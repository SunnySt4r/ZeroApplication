import CheckboxList from "../components/CheckboxList";

const Home = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-text mb-4">Your Config</h1>
      <CheckboxList />
      <button className="mt-4">Install</button>
    </>
  );
};

export default Home;
