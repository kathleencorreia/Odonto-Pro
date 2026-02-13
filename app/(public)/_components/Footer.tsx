
const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-4">
      <p className="text-sm text-gray-500">Todos os direitos reservados © {new Date().getFullYear()} <span className="text-emerald-500 font-semibold">OdontoPro</span></p>
    </footer>
  );
};

export default Footer;
