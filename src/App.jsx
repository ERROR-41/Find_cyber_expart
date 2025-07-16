
import Person from "./components/Person";
import Header from "./components/Header";


const App = () => {
  
  return (
    <div className="w-full mx-auto  scroll-smooth scrollbar-hide">
      <Header />
      <div className="flex flex-col md:flex-row items-center">
        <Person />
      </div>
    </div>
  );
};

export default App;


// const App = () => {
//   return (
//    <CyberSecurityTeam/>
//   )
// }

// export default App
