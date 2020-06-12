import Header from "./Header";

const App = ({ children }: { children?: any }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default App;
