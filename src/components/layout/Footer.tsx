const Footer = () => {
  return (
    <footer 
      style={{ 
        backgroundColor: `var(--VITE_FOOTER_BG_COLOR)`,
        color: `var(--VITE_FOOTER_TEXT_COLOR)`
      }} 
      className="w-full py-6 px-6 mt-auto"
    >
      <div className="container mx-auto">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} 2GO Bank. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;