import logo from './../images/DOTWLogo.jpg';

export default function Header() {
  return (
    <header className="text-center mb-4">
        <img className="logoDad" src={logo} alt="Dads of the Warp Logo" />
      <h1 className="text-3xl mt-0 font-bold">DOTW Spearhead Score</h1>
    </header>
  );
}
