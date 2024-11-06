import CheckboxList from "../components/CheckboxList";

const Home = () => {
  const data = [
    { id: 1, label: "keks" },
    { id: 2, label: "shmeks" },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-text mb-4">Your Config</h1>
      <CheckboxList />
    </>
  );
};

export default Home;
