import {Config, Slot} from "@puckeditor/core";
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

const ColorPicker = ({
	value,
	onChange,
}: {
	value?: string;
	onChange: (value: string) => void;
}) => (
	<div style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0"}}>
		<input
			type="color"
			value={value || "#ffffff"}
			onChange={(e) => onChange(e.target.value)}
			style={{
				border: "1px solid #ccc",
				borderRadius: "4px",
				width: "32px",
				height: "32px",
				padding: "2px",
				cursor: "pointer",
				background: "none"
			}}
		/>
		<span style={{fontSize: "14px", fontFamily: "monospace", color: "#666"}}>
      {value || "#ffffff"}
    </span>
	</div>
);

const BooleanToggle = ({
	value,
	onChange,
	onLabel = "On",
	offLabel = "Off",
}: {
	value?: boolean;
	onChange: (value: boolean) => void;
	onLabel?: string;
	offLabel?: string;
}) => (
	<label style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", cursor: "pointer"}}>
		<input
			type="checkbox"
			checked={Boolean(value)}
			onChange={(e) => onChange(e.target.checked)}
		/>
		<span style={{fontSize: "14px", color: "#666"}}>{value ? onLabel : offLabel}</span>
	</label>
);

type Props = {
	Columns: {
		gap: number;
		horizontalArrangement: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
		verticalAlignment: "top" | "middle" | "bottom";
		content: Slot;
	};
	Text: {
		text: string;
		color: string;
	};
	Image: {
		src: string;
		alt: string;
	};
	ButtonTest: {
		text: string;
		link: string;
		variant: "primary" | "secondary" | "accent" | "custom";
		backgroundColor: string;
		textColor: string;
	};
	
	Heading: HeadingProps;
	ScrollButton: ScrollButtonProps;
	Accordion: AccordionProps;
	Hero: HeroProps;
	MainSec: MainSecProps;
	CtaSec: CtaSecProps;
	BgSec: BgSecProps;
	Button: ButtonProps;
	Lightbox: LightboxProps;
	Footer: FooterProps;
};

const config: Config<Props> = {
	components: {
		Columns: {
			fields: {
				gap: {
					type: "number"
				},
				horizontalArrangement: {
					type: "select",
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
					options: [
						{label: "top", value: "top"},
						{label: "middle", value: "middle"},
						{label: "bottom", value: "bottom"},
					]
				},
				content: { type: "slot" }
			},
			defaultProps: {
				gap: 6,
				horizontalArrangement: "start",
				verticalAlignment: "top",
				content: [],
			},
			render: ({gap, horizontalArrangement, verticalAlignment, content: Content}) => (
				<Content className={"flex"} style={{gap: `${gap}rem`, justifyContent: horizontalArrangement, alignItems: verticalAlignment}} />
			),
		},
		Text: {
			fields: {
				text: {type: "textarea"},
				color: {
					type: "custom",
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
					render: ImagePicker,
				},
				alt: {type: "text"},
			},
			defaultProps: {
				src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
				alt: "Placeholder image",
			},
			render: ({src, alt}) => (
				<img src={src} alt={alt} className="block w-full h-auto rounded-lg shadow-md"/>
			),
		},
		ButtonTest: {
			fields: {
				text: {type: "text"},
				link: {type: "text"},
				variant: {
					type: "select",
					options: [
						{label: "Primary", value: "primary"},
						{label: "Secondary", value: "secondary"},
						{label: "Accent", value: "accent"},
						{label: "Custom", value: "custom"},
					],
				},
				backgroundColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
			},
			defaultProps: {
				text: "Learn More",
				link: "#",
				variant: "primary",
				backgroundColor: "#2563eb",
				textColor: "#ffffff",
			},
			render: ({text, link, variant, backgroundColor, textColor}) => {
				const variantClasses = {
					primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
					secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
					accent: "bg-[#D7CEB2] text-black hover:bg-[#c5ba9a]",
					custom: "",
				};

				const style = variant === "custom" ? {backgroundColor, color: textColor} : {};

				return (
					<div className="my-4">
						<a
							href={link}
							style={style}
							className={`inline-block px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${variantClasses[variant]}`}
						>
							{text}
						</a>
					</div>
				);
			},
		},

		Accordion: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				description: {
					type: "textarea",
					label: "Description",
				},
				bgColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				items: {
					type: "array",
					label: "Accordion items",
					arrayFields: {
						title: {
							type: "text",
							label: "Title",
						},
						heading: {
							type: "text",
							label: "Heading",
						},
						text: {
							type: "textarea",
							label: "Text",
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
				title: {
					type: "text",
					label: "Title",
				},
				logo: {
					type: "custom",
					render: ImagePicker,
				},
				logoAlt: {
					type: "text",
					label: "Logo Alt Text",
				},
				backgroundColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				menuItems: {
					type: "array",
					label: "Menu items",
					arrayFields: {
						label: {
							type: "text",
							label: "Label",
						},
						href: {
							type: "text",
							label: "Link URL",
						}
					}
				},
			},
			render: ({title, logo, logoAlt, backgroundColor, textColor, menuItems}) => (
					<Heading
						title={title}
						logo={logo}
						logoAlt={logoAlt}
						backgroundColor={backgroundColor}
						textColor={textColor}
						menuItems={menuItems}
					/>
				),
				defaultProps: {
						title:"My Website",
						logo:"https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png",
						logoAlt:"Logo",
						backgroundColor:"#000000",
						textColor:"#ffffff",
						menuItems: [
							{ label: "Home", href: "#" },
							{ label: "About", href: "#" },
							{ label: "Services", href: "#" },
							{ label: "Contact", href: "#" },
						],
				}
			},
			ScrollButton: {
				fields: {
					scrollButtonColor: {
						type: "custom",
						render: ColorPicker,
					},
					scrollButtonArrowColor: {
						type: "custom",
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
					label: "Title",
				},
				subtitle: {
					type: "textarea",
					label: "Subtitle",
				},
				bgHeroUrl: {
					type: "custom",
					render: ImagePicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				items: {
					type: "array",
					label: "Hero buttons",
					arrayFields: {
						title: {
							type: "text",
							label: "Button title",
						},
						buttonTextColor: {
					type: "custom",
					render: ColorPicker,
				},
						url: {
							type: "text",
							label: "Link URL",
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
		MainSec: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				text: {
					type: "textarea",
					label: "Text",
				},
				imageUrl: {
					type: "custom",
					render: ImagePicker,
				},
				imageAlt: {
					type: "text",
					label: "Image Alt Text",
				},
				bgColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				reverseLayout: {
					type: "custom",
					render: BooleanToggle,
				},
				buttonToggle: {
					type: "custom",
					render: BooleanToggle,
				},
				buttonText: {
					type: "text",
					label: "Button Text",
				},
				buttonBgColor: {
					type: "custom",
					render: ColorPicker,
				},
				buttonTextColor: {
					type: "custom",
					render: ColorPicker,
				},
				buttonHref: {
					type: "text",
					label: "Button Link URL",
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
		CtaSec: {
			fields: {
				title: {
					type: "text",
					label: "Title",
				},
				points: {
					type: "array",
					label: "Points",
					arrayFields: {
						point: {
							type: "text",
							label: "Point",
						},
					}
				},
				buttonText: {
					type: "text",
					label: "Button Text",
				},
				buttonColor: {
					type: "custom",
					render: ColorPicker,
				},
				bgColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				imageUrl: {
					type: "custom",
					render: ImagePicker,
				},
				imageAlt: {
					type: "text",
					label: "Image Alt Text",
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
		BgSec: {
			fields: {
				bgImageUrl: {
					type: "custom",
					render: ImagePicker,
				},
				title: {
					type: "text",
					label: "Title",
				},
				text: {
					type: "textarea",
					label: "Text",
				},
				textColor: {
					type: "custom",
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
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
				text: {
					type: "text",
					label: "Button text",
				},
				href: {
					type: "text",
					label: "Link URL",
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
					label: "Images",
					arrayFields: {
						src: {
							type: "custom",
							render: ImagePicker,
						},
						alt: {
							type: "text",
							label: "Alt text",
						},
					}
				},
				pointsHeader: {
					type: "text",
					label: "Points header",
				},
				points: {
					type: "array",
					label: "Points",
					arrayFields: {
						point: {
							type: "text",
							label: "Point",
						},
					}
				},
				text: {
					type: "text",
					label: "Text",
				},
				bgColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
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
		Footer: {
			fields: {
				text: {
					type: "text",
					label: "Footer text",
				},
				bgColor: {
					type: "custom",
					render: ColorPicker,
				},
				textColor: {
					type: "custom",
					render: ColorPicker,
				},
			},
			render: ({text, bgColor, textColor}) => (
				<Footer bgColor={bgColor} textColor={textColor} text={text} />
			),
			defaultProps: {
				text: "© 2024 My Company. All rights reserved.",
				bgColor: "#333333",
				textColor: "#ffffff",
			},
		},
		// Contact: {
		// 	fields: {
		// 		title: {
		// 			type: "text",
		// 			label: "Title",
		// 		},
		// 		bgColor: {
		// 			type: "custom",
		// 			render: ColorPicker,
		// 		},
		// 		textColor: {
		// 			type: "custom",
		// 			render: ColorPicker,
		// 		},
		// 	},
		// 	render: ({title, bgColor, textColor}) => (
		// 	),
		// 	defaultProps: {
		// 		title: "Kontakt",
		// 		bgColor: "rgba(0, 0, 0, 0.25)",
		// 		textColor: "#ffffff",
		// 	},
		// }
	},
};

export default config;