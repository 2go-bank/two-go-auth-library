const Footer = () => {
  return (
    <footer className="bg-black w-full py-6 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="text-[#EFB207] text-center">
          <p>&copy; {new Date().getFullYear()} 2GO Bank. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;