import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Ill Fits</Link>
        <div className="sub-bar">
          <p>Search</p>
        </div>
      </div>
      <Nav />
    </header>
  );
}
