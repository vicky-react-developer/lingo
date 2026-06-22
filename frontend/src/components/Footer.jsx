export default function Footer({style}) {
  return (
    <footer className="app-footer" style={style}>
      © {new Date().getFullYear()} Lingo Refresh. All rights reserved.
    </footer>
  );
}