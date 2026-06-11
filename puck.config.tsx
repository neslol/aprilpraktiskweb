import {Config, Slot} from "@puckeditor/core";
import ImagePicker from "@/app/admin/editor/[[...puckPath]]/ImagePicker";
import Accordion, {AccordionProps} from "@/app/Accordion";
import {Heading} from "@/app/Heading";
import {Hero, HeroProps} from "@/app/Hero";
import MainSec, { MainSecProps } from "@/app/MainSec";
import CtaSec, { CtaSecProps } from "@/app/CtaSec";
import BgSec, { BgSecProps } from "@/app/BgSec";
import Button, { ButtonProps } from "@/app/Button";
import Lightbox, { LightboxProps } from "@/app/Lightbox";
import Footer, { FooterProps } from "@/app/Footer";

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
}: {
	value?: boolean;
	onChange: (value: boolean) => void;
}) => (
	<label style={{display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", cursor: "pointer"}}>
		<input
			type="checkbox"
			checked={Boolean(value)}
			onChange={(e) => onChange(e.target.checked)}
		/>
		<span style={{fontSize: "14px", color: "#666"}}>{value ? "Reversed layout" : "Text left, image right"}</span>
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
	
	Heading: Record<string, never>;
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
			render: ({title, description, items = [], bgColor, textColor, puck}) => {
				const openInEditor = puck.isEditing;
				return (
					<Accordion
						title={title}
						description={description}
						items={items}
						openAll={openInEditor}
						bgColor={bgColor}
						textColor={textColor}
					/>
				);
			},
		},
		Heading: {
			render: () => {
				return (
					<Heading />
				);
			},
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
			render: ({title, subtitle, bgHeroUrl, textColor, items = []}) => {
				return (
					<Hero
						title={title}
						subtitle={subtitle}
						bgHeroUrl={bgHeroUrl}
						textColor={textColor}
						items={items}
					/>
				);
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
			},
			render: ({title, text, imageUrl, imageAlt, bgColor, textColor, reverseLayout}) => {
				return (
					<MainSec
						title={title}
						text={text}
						imageUrl={imageUrl}
						imageAlt={imageAlt}
						bgColor={bgColor}
						textColor={textColor}
						reverseLayout={reverseLayout}
					/>
				);
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
			render: ({title, points, buttonText, buttonColor, bgColor, textColor, imageUrl, imageAlt}) => {
				return (
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
				);
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
			render: ({bgImageUrl,title, text, textColor}) => {
				return (
					<BgSec
						bgImageUrl={bgImageUrl}
						title={title}
						text={text}	
						textColor={textColor}
					/>
				);
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
				render: ({bgColor, textColor, text, href}) => {
				return (
					<Button
							bgColor={bgColor}
							textColor={textColor}
						text={text}
						href={href}
					/>
				);
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
			render: ({images = [], text, bgColor, textColor}) => {
				return (
					<Lightbox images={images} text={text} bgColor={bgColor} textColor={textColor} />
				);
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
	},
};

export default config;