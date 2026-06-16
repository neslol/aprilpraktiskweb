type FooterItem = {
  text: string;
  href?: string;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

type SocialLink = {
  platform: "instagram" | "facebook" | "linkedin" | "youtube" | "x";
  href: string;
};

export type FooterProps = {
  bgColor: string;
  textColor: string;

  companyName: string;
  year: number;
  cvr?: string;

  sections: FooterSection[];
  socialLinks: SocialLink[];
};

const Footer = ({
  bgColor,
  textColor,
  companyName,
  year,
  cvr,
  sections,
  socialLinks,
}: FooterProps) => {
  return (
    <footer
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className="p-8 flex flex-col flex-wrap"
    >
      
      <div className="flex flex-wrap gap-12 justify-center">
        {sections?.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold mb-3">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.href ? (
                    <a href={item.href}>
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Company & social info */}
      <div className="flex justify-center gap-10">

      {/* Company Info */}
      <div className="text-center mt-8 text-sm">
        <p>
          © {year} {companyName}
        </p>

        {cvr && (
          <p>
            CVR: {cvr}
          </p>
        )}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-5 mt-8">
        {socialLinks?.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`/icons/${social.platform}.svg`}
              alt={`${social.platform} icon`}
              className="w-6 h-6"
            />
          </a>
        ))}
      </div>
      </div>
    </footer>
  );
};

export default Footer;