import Image from 'next/image';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="bg-brand-primary flex flex-col items-center justify-center px-4 py-6 md:px-8 md:py-12 lg:px-[100px]"
    >
        <div className="w-full lg:max-w-[75rem]">
            <h1 className="text-white text-heading-h1 font-heading-h1-600">About Brendan</h1>
            <div className="h-2 w-8 bg-accent mb-12"></div>
            <div className="flex flex-col items-center justify-content-center">
                <div className="w-[250px] h-[250px] overflow-hidden mb-8 rounded-full">
                    <Image src="/images/profile-image.jpg" alt="profile-image" width="250" height="200"/>
                </div>
                <p className="text-center">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            </div>
        </div>
    </section>
  );
};

export default AboutSection;