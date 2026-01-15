const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-12 lg:px-[100px]"
    >
        <div className="w-full lg:max-w-[75rem]">
            <h1 className="text-white text-heading-h1 font-heading-h1-600">Contact</h1>
            <div className="h-2 w-8 bg-accent mb-12"></div>
        </div>
    </section>
  );
};

export default ContactSection;