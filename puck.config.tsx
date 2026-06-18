import {Config, Slot, usePuck} from "@puckeditor/core";
import ImagePicker from "@/app/admin/editor/[[...puckPath]]/ImagePicker";
import Accordion, {AccordionProps} from "@/app/Accordion";
import Heading, {HeadingProps} from "@/app/Heading";
import Hero, {HeroProps} from "@/app/Hero";
import MainSec, { MainSecProps } from "@/app/MainSec";
import CtaSec, { CtaSecProps } from "@/app/CtaSec";
import BgSec, { BgSecProps } from "@/app/BgSec";
import Button, { ButtonProps } from "@/app/Button";
import Lightbox, { LightboxProps } from "@/app/Lightbox";
import Footer, { FooterProps } from "@/app/Footer";
import ScrollButton, {ScrollButtonProps} from "./app/ScrollButton";
import LaunchHero, { LaunchHeroProps } from "./app/LaunchHero";
import Contact, { ContactProps } from "./app/Contact";

const ColorPicker = ({
    value,
    onChange,
    label,
}: {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}) => (
    <div style={{ marginBottom: "12px" }}>
        {label && <div style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: "#333" }}>{label}</div>}
        <div style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0"}}>
            <input
                type="color"
                value={value || "#ffffff"}
                onChange={(e) => onChange(e.target.value)}
                style={{ flex: 1, border: "1px solid #ccc", borderRadius: "4px", width: "32px", height: "32px", cursor: "pointer" }}
            />
            <input type="text" value={value || "#ffffff"} onChange={(e) => onChange(e.target.value)} style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "2px"}} />
        </div>
    </div>
);

const BooleanToggle = ({
    value,
    onChange,
    label, // 1. Destructure the label passed by Puck
    onLabel = "On",
    offLabel = "Off",
}: {
    value?: boolean;
    onChange: (value: boolean) => void;
    label?: string; // 2. Add label to the TypeScript definition
    onLabel?: string;
    offLabel?: string;
}) => (
    <div style={{ marginBottom: "12px" }}>
        {/* 3. Render the section label if it exists to match standard fields */}
        {label && (
            <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "4px", color: "#333" }}>
                {label}
            </div>
        )}
        
        <label style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", cursor: "pointer"}}>
            <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span style={{fontSize: "14px", color: "#666"}}>{value ? onLabel : offLabel}</span>
        </label>
    </div>
);

type Props = {
    Columns: {
        gap: number;
        horizontalArrangement: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
        verticalAlignment: "top" | "middle" | "bottom";
        content: Slot;
        bgColor: string;

    };
    Text: {
        text: string;
        color: string;
    };
    Image: {
        src: string;
        alt: string;
    };
    Heading: HeadingProps;
    "Scroll Button": ScrollButtonProps;
    Accordion: AccordionProps;
    Hero: HeroProps;
    "Main Section": MainSecProps;
    "Call To Action Section": CtaSecProps;
    "Background Section": BgSecProps;
    Button: ButtonProps;
    Lightbox: LightboxProps;
    Footer: FooterProps;
    "Launch Hero": LaunchHeroProps;
    Contact: ContactProps;
};

const config: Config<Props> = {
    // 1. Categories group your left-sidebar components cleanly for the creator
    categories: {
        Layout: { components: ["Columns"] },
        Typography: { components: ["Text"] },
        Media: { components: ["Image", "Lightbox"] },
        Sections: { components: ["Hero", "Launch Hero", "Main Section", "Call To Action Section", "Background Section"] },
        Navigation: { components: ["Heading", "Scroll Button", "Footer"] },
        Interactive: { components: ["Accordion", "Button", "Contact"] }
    },
    components: {
        Columns: {
            fields: {
                gap: {
                    type: "number",
                    label: "Gap Size (rem)"
                },
                horizontalArrangement: {
                    type: "select",
                    label: "Horizontal Alignment",
                    options: [
                        {label: "Start", value: "start"},
                        {label: "Center", value: "center"},
                        {label: "End", value: "end"},
                        {label: "Space between", value: "space-between"},
                        {label: "Space around", value: "space-around"},
                        {label: "Space evenly", value: "space-evenly"},
                    ]
                },
                verticalAlignment: {
                    type: "select",
                    label: "Vertical Alignment",
                    options: [
                        {label: "Top", value: "top"},
                        {label: "Middle", value: "middle"},
                        {label: "Bottom", value: "bottom"},
                    ]
                },
                content: { type: "slot" },
                bgColor: {
                    type: "custom",
                    label: "Background Color",
                    render: ColorPicker,
                },
            },
            defaultProps: {
                gap: 6,
                horizontalArrangement: "start",
                verticalAlignment: "top",
                content: [],
                bgColor: "#ffffff",
            },
            render: ({gap, horizontalArrangement, verticalAlignment, content: Content, bgColor}) => (
                <Content className={"flex"} style={{gap: `${gap}rem`, justifyContent: horizontalArrangement, alignItems: verticalAlignment, backgroundColor: bgColor}} />
            ),
        },
        Text: {
            fields: {
                text: {type: "textarea", label: "Paragraph Content"},
                color: {
                    type: "custom",
                    label: "Text Color",
                    render: ColorPicker,
                },
            },
            defaultProps: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                color: "#000000",
            },
            render: ({text, color}) => (
                <p className={`text-lg leading-relaxed my-4`} style={{color}}>{text}</p>
            ),
        },
        Image: {
            fields: {
                src: {
                    type: "custom",
                    label: "Select Image",
                    render: ImagePicker,
                },
                alt: {type: "text", label: "Alt Text (Accessibility)"},
            },
            defaultProps: {
                src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                alt: "Placeholder image",
            },
            render: ({src, alt}) => (
                <img src={src} alt={alt} className="block w-full h-auto rounded-lg shadow-md"/>
            ),
        },

        Accordion: {
            fields: {
                title: {
                    type: "text",
                    label: "Accordion Section Title",
                },
                description: {
                    type: "textarea",
                    label: "Section Description",
                },
                bgColor: {
                    type: "custom",
                    label: "Background Color",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Text Color",
                    render: ColorPicker,
                },
                items: {
                    type: "array",
                    label: "Accordion Items",
                    // getItemSummary shows the title of the individual pane dynamically in the puck editor listing
                    getItemSummary: (item) => item.title || "Untitled Accordion Item",
                    arrayFields: {
                        title: {
                            type: "text",
                            label: "Tab Trigger Title",
                        },
                        heading: {
                            type: "text",
                            label: "Inner Content Heading",
                        },
                        text: {
                            type: "textarea",
                            label: "Inner Content Body Text",
                        },
                    }
                },
            },
            render: ({title, description, items = [], bgColor, textColor}) => (
                    <Accordion
                        title={title}
                        description={description}
                        items={items}
                        bgColor={bgColor}
                        textColor={textColor}
                    />
                ),
                defaultProps: {
                title: "Frequently Asked Questions",
                description: "Here are some of our FAQs. If you have any other quesitons you'd like answered please feel free to email us.",
                bgColor: "#f9f9f9",
                textColor: "#111111",
                items: [
                    { title: "What is your return policy?", heading: "Return Policy", text: "You can return any item within 30 days of purchase for a full refund." },
                    { title: "Do you offer international shipping?", heading: "International Shipping", text: "Yes, we ship to most countries worldwide. Shipping costs will apply, and will be added at checkout." },
                    { title: "How can I track my order?", heading: "Order Tracking", text: "Once your order has shipped, we will send you an email with the tracking information." },
                ],
            },
        },
        Heading: {
            fields: {
                editorPreviewOpen: {
                    type: "custom",
                    label: "Åbn menuen, husk at slå dette fra!",
                    render: BooleanToggle,
                },
                title: {
                    type: "text",
                    label: "Website Name / Brand Title",
                },
                logo: {
                    type: "custom",
                    label: "Brand Logo Image",
                    render: ImagePicker,
                },
                logoAlt: {
                    type: "text",
                    label: "Logo Alt Text",
                },
                backgroundColor: {
                    type: "custom",
                    label: "Navbar Background Color",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Navbar Text Color",
                    render: ColorPicker,
                },
                backgroundColorMenuItems: {
                    type: "custom",
                    label: "Menu Items Background Color",
                    render: ColorPicker,
                },
                menuItems: {
                    type: "array",
                    label: "Navigation Menu Links",
                    getItemSummary: (item) => item.label || "Link",
                    arrayFields: {
                        label: {
                            type: "text",
                            label: "Link Label",
                        },
                        href: {
                            type: "text",
                            label: "Navigation Path / URL",
                        }
                    }
                },
            },
            render: ({editorPreviewOpen, title, logo, logoAlt, backgroundColor, textColor, backgroundColorMenuItems, menuItems}) => {

                return (
                    <Heading
                        title={title}
                        logo={logo}
                        logoAlt={logoAlt}
                        backgroundColor={backgroundColor}
                        textColor={textColor}
                        backgroundColorMenuItems={backgroundColorMenuItems}
                        menuItems={menuItems}
                        editorPreviewOpen={editorPreviewOpen}
                    />
                );
            },
                defaultProps: {
                    editorPreviewOpen: false,
                        title:"My Website",
                        logo:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png",
                        logoAlt:"Logo",
                        backgroundColor:"#000000",
                        textColor:"#ffffff",
                        backgroundColorMenuItems:"#000000",
                        menuItems: [
                            { label: "Home", href: "#" },
                            { label: "About", href: "#" },
                            { label: "Services", href: "#" },
                            { label: "Contact", href: "#" },
                        ],
                }
            },
            "Scroll Button": {
                fields: {
                    scrollButtonColor: {
                        type: "custom",
                        label: "Button Circle Color",
                        render: ColorPicker,
                    },
                    scrollButtonArrowColor: {
                        type: "custom",
                        label: "Arrow Icon Color",
                        render: ColorPicker,
                    },
                },
                render: ({scrollButtonColor, scrollButtonArrowColor}) => (
                    <ScrollButton 
                    scrollButtonColor={scrollButtonColor} 
                    scrollButtonArrowColor={scrollButtonArrowColor} 
                    />
                ),
                defaultProps: {
                    scrollButtonColor:"#2563eb",
                    scrollButtonArrowColor:"#ffffff"
                }
            },
        Hero: {
            fields: {
                title: {
                    type: "text",
                    label: "Hero Heading Title",
                },
                subtitle: {
                    type: "textarea",
                    label: "Hero Subtitle Text",
                },
                bgHeroUrl: {
                    type: "custom",
                    label: "Hero Background Image",
                    render: ImagePicker,
                },
                textColor: {
                    type: "custom",
                    label: "Overlay Text Color",
                    render: ColorPicker,
                },
                items: {
                    type: "array",
                    label: "Call to Action Buttons",
                    getItemSummary: (item) => item.title || "Button",
                    arrayFields: {
                        title: {
                            type: "text",
                            label: "Button Text Label",
                        },
                        buttonTextColor: {
                            type: "custom",
                            label: "Button Font Color",
                            render: ColorPicker,
                        },
                        url: {
                            type: "text",
                            label: "Target Redirect URL",
                        },
                    },
                },
            },
            render: ({title, subtitle, bgHeroUrl, textColor, items = []}) => (
                    <Hero
                        title={title}
                        subtitle={subtitle}
                        bgHeroUrl={bgHeroUrl}
                        textColor={textColor}
                        items={items}
                    />
                ),
                defaultProps: {
                title: "Welcome to Our Website",
                subtitle: "Discover our amazing products and services. We offer the best solutions for your needs.",
                bgHeroUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                textColor: "#ffffff",
                items: [
                    { title: "Get Started", buttonTextColor: "#ffffff", url: "#" },
                    { title: "Learn More", buttonTextColor: "#ffffff", url: "#" },
                ],
            },
        },

        "Launch Hero": {
            fields: {
                bgHeroUrl: {
                    type: "custom",
                    label: "Primary Background Image",
                    render: ImagePicker,
                },
                bgHeroUrl2: {
                    type: "custom",
                    label: "Secondary / Fallback Image",
                    render: ImagePicker,
                },
                textColor: {
                    type: "custom",
                    label: "Text Color Style",
                    render: ColorPicker,
                },
                buttonTitle1: {
                    type: "text",
                    label: "Left Button Text",
                },
                buttonurl1: {
                    type: "text",
                    label: "Left Button Hyperlink",
                },
                buttonTextColor1: {
                    type: "custom",
                    label: "Left Button Font Color",
                    render: ColorPicker,
                },
                buttonTitle2: {
                    type: "text",
                    label: "Right Button Text",
                },
                buttonurl2: {
                    type: "text",
                    label: "Right Button Hyperlink",
                },
                buttonTextColor2: {
                    type: "custom",
                    label: "Right Button Font Color",
                    render: ColorPicker,
                },

            },
            render: ({bgHeroUrl, bgHeroUrl2, textColor, buttonTitle1, buttonurl1, buttonTextColor1, buttonTitle2, buttonurl2, buttonTextColor2}) => (
                <LaunchHero
                    bgHeroUrl={bgHeroUrl}
                    bgHeroUrl2={bgHeroUrl2}
                    textColor={textColor}
                    buttonTitle1={buttonTitle1}
                    buttonurl1={buttonurl1}
                    buttonTextColor1={buttonTextColor1}
                    buttonTitle2={buttonTitle2}
                    buttonurl2={buttonurl2}
                    buttonTextColor2={buttonTextColor2}
                    
                />
            ),
            defaultProps: {
                bgHeroUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                textColor: "#ffffff",
                buttonTitle1: "Button 1",
                buttonurl1: "#",
                buttonTextColor1: "#ffffff",
                bgHeroUrl2: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                buttonTitle2: "Button 2",
                buttonurl2: "#",
                buttonTextColor2: "#ffffff",
            },
        },
                      
        "Main Section": {
            fields: {
                title: {
                    type: "text",
                    label: "Section Title",
                },
                text: {
                    type: "textarea",
                    label: "Body Narrative Text",
                },
                imageUrl: {
                    type: "custom",
                    label: "Featured Graphic / Image",
                    render: ImagePicker,
                },
                imageAlt: {
                    type: "text",
                    label: "Image Accessibility Label (Alt)",
                },
                bgColor: {
                    type: "custom",
                    label: "Component Background Color",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Component Text Color",
                    render: ColorPicker,
                },
                reverseLayout: {
                    type: "custom",
                    label: "Reverse Layout Alignment",
                    render: BooleanToggle,
                },
                buttonToggle: {
                    type: "custom",
                    label: "Display Call to Action Button",
                    render: BooleanToggle,
                },
                buttonText: {
                    type: "text",
                    label: "Action Button Text",
                },
                buttonBgColor: {
                    type: "custom",
                    label: "Action Button Background",
                    render: ColorPicker,
                },
                buttonTextColor: {
                    type: "custom",
                    label: "Action Button Typography Color",
                    render: ColorPicker,
                },
                buttonHref: {
                    type: "text",
                    label: "Action Button Link destination",
                },
            },
            render: ({title, text, imageUrl, imageAlt, bgColor, textColor, reverseLayout, buttonToggle, buttonText, buttonBgColor, buttonTextColor, buttonHref}) => (
                    <MainSec
                        title={title}
                        text={text}
                        imageUrl={imageUrl}
                        imageAlt={imageAlt}
                        bgColor={bgColor}
                        textColor={textColor}
                        reverseLayout={reverseLayout}
                        buttonToggle={buttonToggle}
                        buttonText={buttonText}
                        buttonBgColor={buttonBgColor}
                        buttonTextColor={buttonTextColor}
                        buttonHref={buttonHref}
                    />
                ),
                defaultProps: {
                title: "Main Section",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                imageAlt: "Placeholder image",
                bgColor: "#000fff",
                textColor: "#111111",
                reverseLayout: false,
                buttonToggle: false,
                buttonText: "Learn More",
                buttonBgColor: "#2563eb",
                buttonTextColor: "#ffffff",
                buttonHref: "#",
            },
        },
        "Call To Action Section": {
            fields: {
                title: {
                    type: "text",
                    label: "Section Heading Call",
                },
                points: {
                    type: "array",
                    label: "Feature / Selling Points Listing",
                    arrayFields: {
                        point: {
                            type: "text",
                            label: "Bullet Point Entry Description",
                        },
                    }
                },
                buttonText: {
                    type: "text",
                    label: "Clickable Link Text",
                },
                buttonColor: {
                    type: "custom",
                    label: "Clickable Button Theme Color",
                    render: ColorPicker,
                },
                bgColor: {
                    type: "custom",
                    label: "Background Color Space",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Layout Font Color",
                    render: ColorPicker,
                },
                imageUrl: {
                    type: "custom",
                    label: "Accompanying Asset Image",
                    render: ImagePicker,
                },
                imageAlt: {
                    type: "text",
                    label: "Asset Image Alternative Description",
                },
            },
            render: ({title, points, buttonText, buttonColor, bgColor, textColor, imageUrl, imageAlt}) => (
                    <CtaSec
                        title={title}
                        points={points}
                        buttonText={buttonText}
                        buttonColor={buttonColor}
                        bgColor={bgColor}
                        textColor={textColor}
                        imageUrl={imageUrl}
                        imageAlt={imageAlt}
                    />
                ),
                defaultProps: {
                title: "Call to Action",
                points: [{point: "Benefit 1"}, {point: "Benefit 2"}, {point: "Benefit 3"}],
                buttonText: "Get Started",
                buttonColor: "#2563eb",
                bgColor: "#52b76c",
                textColor: "#111111",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                imageAlt: "Placeholder image",
            },
        },
        "Background Section": {
            fields: {
                bgImageUrl: {
                    type: "custom",
                    label: "Full Background Image Container",
                    render: ImagePicker,
                },
                title: {
                    type: "text",
                    label: "Overlay Section Title",
                },
                text: {
                    type: "textarea",
                    label: "Overlay Body Description Text",
                },
                textColor: {
                    type: "custom",
                    label: "Overlay Typography Color",
                    render: ColorPicker,
                },
            },
            render: ({bgImageUrl,title, text, textColor}) => (
                    <BgSec
                        bgImageUrl={bgImageUrl}
                        title={title}
                        text={text} 
                        textColor={textColor}
                    />
                ),
            defaultProps: {
                bgImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
                title: "Background Section",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                textColor: "#ffffff",
            },
        },
        Button: {
            fields: {
                bgColor: {
                    type: "custom",
                    label: "Interactive Base Background Color",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Interactive Text Typography Color",
                    render: ColorPicker,
                },
                text: {
                    type: "text",
                    label: "Display Text Value",
                },
                href: {
                    type: "text",
                    label: "Hyperlink Redirect Destination Path",
                },
            },
                render: ({bgColor, textColor, text, href}) => (
                    <Button
                        bgColor={bgColor}
                        textColor={textColor}
                        text={text}
                        href={href}
                    />
                ),
                defaultProps: {
                bgColor: "#D7CEB2",
                textColor: "black",
                text: "Læs mere",
                href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
        },
        Lightbox: {
            fields: {
                images: {
                    type: "array",
                    label: "Gallery Media Images Collection",
                    getItemSummary: (item) => item.alt || "Gallery Image Asset",
                    arrayFields: {
                        src: {
                            type: "custom",
                            label: "Upload Gallery Image",
                            render: ImagePicker,
                        },
                        alt: {
                            type: "text",
                            label: "Accessibility Alternative Title Text",
                        },
                    }
                },
                pointsHeader: {
                    type: "text",
                    label: "Key Specifications Section Title",
                },
                points: {
                    type: "array",
                    label: "List of Highlights",
                    arrayFields: {
                        point: {
                            type: "text",
                            label: "Highlight Bullet Text",
                        },
                    }
                },
                text: {
                    type: "text",
                    label: "Footer/Closing Context Paragraph Text",
                },
                bgColor: {
                    type: "custom",
                    label: "Wrapper Block Background Theme",
                    render: ColorPicker,
                },
                textColor: {
                    type: "custom",
                    label: "Wrapper Text Font Colors",
                    render: ColorPicker,
                },
            },
            render: ({images = [], pointsHeader, points, text, bgColor, textColor}) => (
                    <Lightbox images={images} pointsHeader={pointsHeader} points={points} text={text} bgColor={bgColor} textColor={textColor} />
            ),
            defaultProps: {
                bgColor: "#D7CEB2",
                textColor: "black",
                images: [
                    { src: "https://picsum.photos/200/300", alt: "Sample image 1" },
                    { src: "https://picsum.photos/201/301", alt: "Sample image 2" },
                    { src: "https://picsum.photos/202/302", alt: "Sample image 3" },
                    { src: "https://picsum.photos/203/303", alt: "Sample image 4" },
                ],
                pointsHeader: "Key Points",
                points: [
                    "Point 1",
                    "Point 2",
                    "Point 3"
                ],
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
        },
        Contact: {
            fields: {
                editorPreviewOpen: {
                    type: "custom",
                    label: "Åbn kontaktformularen, husk at slå dette fra!",
                    render: BooleanToggle,
                },
                namePlaceholder: {
                    type: "text",
                    label: "Navn placeholder",
                },
                emailPlaceholder: {
                    type: "text",
                    label: "Email placeholder",
                },
                phonePlaceholder: {
                    type: "text",
                    label: "Tlf.nr. placeholder",
                },
                messagePlaceholder: {
                    type: "text",
                    label: "Besked el.lign placeholder",
                },
                buttonStrokeColor: {
                    type: "custom",
                    label: "Button Stroke Color",
                    render: ColorPicker,
                },
                primaryBgColor: {
                    type: "custom",
                    label: "Primary Background Color",
                    render: ColorPicker,
                },
                primaryBgHoverColor: {
                    type: "custom",
                    label: "Primary Background Hover Color",
                    render: ColorPicker,
                },
                accentBgColor: {
                    type: "custom",
                    label: "Accent / Button Background Color",
                    render: ColorPicker,
                },
                accentBgHoverColor: {
                    type: "custom",
                    label: "Accent / Button Background Hover Color",
                    render: ColorPicker,
                },
                accentFocusColor: {
                    type: "custom",
                    label: "Accent / Button Focus Color",
                    render: ColorPicker,
                },
            },
            render: ({editorPreviewOpen, namePlaceholder, emailPlaceholder, phonePlaceholder, messagePlaceholder, buttonStrokeColor, primaryBgColor, primaryBgHoverColor, accentBgColor, accentBgHoverColor, accentFocusColor}) => {

                return (
                    <Contact
                        editorPreviewOpen={editorPreviewOpen}
                        namePlaceholder={namePlaceholder}
                        emailPlaceholder={emailPlaceholder}
                        phonePlaceholder={phonePlaceholder}
                        messagePlaceholder={messagePlaceholder}
                        buttonStrokeColor={buttonStrokeColor}
                        primaryBgColor={primaryBgColor}
                        primaryBgHoverColor={primaryBgHoverColor}
                        accentBgColor={accentBgColor}
                        accentBgHoverColor={accentBgHoverColor}
                        accentFocusColor={accentFocusColor}
                    />
                );
            },
                defaultProps: {
                editorPreviewOpen: false,
                namePlaceholder: "Navne Navnesen",
                emailPlaceholder: "navne@navnesen.dk",
                phonePlaceholder: "12345678",
                messagePlaceholder: "Din besked",
                buttonStrokeColor: "#0056b3",
                primaryBgColor: "#007bff",
                primaryBgHoverColor: "#0056b3",
                accentBgColor: "#28a745",
                accentBgHoverColor: "#218838",
                accentFocusColor: "#138496",
            },
        },
        

        Footer: {
          fields: {
            companyName: {
              type: "text",
              label: "Registered Company Name",
            },
            year: {
              type: "number",
              label: "Copyright Year Representation",
            },
            cvr: {
              type: "text",
              label: "CVR Business Registry Identifier",
            },
            bgColor: {
              type: "custom",
              label: "Footer Block Background Color",
              render: ColorPicker,
            },
            textColor: {
              type: "custom",
              label: "Footer Block Text Color Style",
              render: ColorPicker,
            },
            sections: {
              type: "array",
              label: "Footer Column Sections",
              getItemSummary: (item) => item.title || "Untitled Links Group",
              arrayFields: {
                title: {
                  type: "text",
                  label: "Column Group Title Heading",
                },
                items: {
                  type: "array",
                  label: "Inner Redirect Paths Links",
                  getItemSummary: (item) => item.text || "Sub Link Item",
                  arrayFields: {
                    text: {
                      type: "text",
                      label: "Hyperlink Public Title",
                    },
                    href: {
                      type: "text",
                      label: "Target URL Address Redirect",
                    },
                  },
                },
              },
            },
            socialLinks: {
              type: "array",
              label: "Social Networks Configuration Channels",
              getItemSummary: (item) => item.platform ? item.platform.toUpperCase() : "Social Network Media Link",
              arrayFields: {
                platform: {
                  type: "select",
                  label: "Platform Network Type Logo Selector",
                  options: [
                    { label: "Instagram", value: "instagram" },
                    { label: "Facebook", value: "facebook" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "YouTube", value: "youtube" },
                    { label: "Twitter / X", value: "x" },
                  ],
                },
                href: {
                  type: "text",
                  label: "Public Profile Absolute URL",
                },
              },
            },
          },
          render: (props) => (
            <Footer {...props} />
          ),
          defaultProps: {
            companyName: "My Company ApS",
            year: new Date().getFullYear(),
            cvr: "12345678",
            bgColor: "#333333",
            textColor: "#ffffff",
            sections: [
              {
                title: "Company",
                items: [
                  { text: "About", href: "/about" },
                  { text: "Contact", href: "/contact" },
                ],
              },
            ],
            socialLinks: [
              { platform: "instagram", href: "https://instagram.com" },
              { platform: "linkedin", href: "https://linkedin.com" },
            ],
          },
        },
    },
};

export default config;