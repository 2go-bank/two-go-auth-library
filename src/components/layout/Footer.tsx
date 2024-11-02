const Footer = () => {
  const footerBgColor = import.meta.env.VITE_FOOTER_BG_COLOR || '#000000';
  const footerTextColor = import.meta.env.VITE_FOOTER_TEXT_COLOR || '#EFB207';

  return (
    <footer style={{ backgroundColor: footerBgColor }} className="w-full py-6 px-6 mt-auto">
      <div className="container mx-auto">
        <div style={{ color: footerTextColor }} className="text-center">
          <p>&copy; {new Date().getFullYear()} 2GO Bank. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;