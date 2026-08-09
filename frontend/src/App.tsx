import BookingForm from './components/BookingForm';

import './App.css';

function App() {
  return (
    <>
      <div className="bg-[url('./assets/CarWash.jpg')] bg-cover bg-center bg-no-repeat flex flex-col h-screen w-screen text-white ">
        <h1 className="text-xl w-fit pt-3 pl-7 md:text-2xl">
          Bayou Detailing{' '}
        </h1>
        <div className="flex w-screen h-screen justify-center ">
          <BookingForm />
        </div>
      </div>
    </>
  );
}

export default App;
