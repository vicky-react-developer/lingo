export default function Footer({ backgroundColor, textColor }) {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 text-center p-3 text-xs ${textColor ? textColor : "text-[#6c757d]"} ${backgroundColor ? backgroundColor : "bg-white"} border-t border-[#eee]`}
    >
      © {new Date().getFullYear()} Lingo Refresh. All rights reserved.
    </footer>
  );
}